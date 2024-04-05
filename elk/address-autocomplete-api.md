# Building a Fast Address Autocomplete Service Using Elasticsearch

In this blog post, we will build a fast, privacy-focused address autocomplete service, leveraging Elasticsearch's powerful search capabilities to provide address suggestions to users as they type in an address.

## Core Features

- **Rapid Response**: Deliver address suggestions within milliseconds, even with a dataset of 10 million records.
- **Geolocation Support**: Return addresses sorted by distance from the user's location.

## Why not use Google Places API?

While Google Places API is a popular choice for address autocomplete, it comes with potential costs and privacy concerns. Google Places API is a subscription-based service, and the free tier has usage limits. For address autocomplete, the number of requests can quickly accumulate due to every user interaction with the address field triggering a request. Additionally, using Google Places API means that user data is shared with Google, which may not be desirable in some cases. By building our own address autocomplete API, we can ensure that user data is not shared with third parties.

## Prerequisites

- Node.js
- Elasticsearch
- Logstash

You will first need to install Node.js on your machine, available for download [here](https://nodejs.org). Next, ensure you have Elasticsearch or access to an Elasticsearch instance; download it [here](https://www.elastic.co/downloads/elasticsearch). Finally, you will need Logstash installed on your machine, which you can download [here](https://www.elastic.co/downloads/logstash).

## Downloading the Data

The first step is to download the data. In this project, we will use the [The Open Database of Addresses (ODA)](https://www.statcan.gc.ca/en/lode/databases/oda) from Statistics Canada. The data is available in CSV format and can be downloaded from the link above. After downloading and unzipping the data, put the CSV files in the `data` directory. The structure of the `data` directory should look like this:

```text
data
├── ODA_AB_v1.csv
├── ODA_BC_v1.csv
├── ODA_MB_v1.csv
├── ODA_NB_v1.csv
├── ODA_NS_v1.csv
├── ODA_NT_v1.csv
├── ODA_ON_v1.csv
├── ODA_PE_v1.csv
├── ODA_QC_v1.csv
└── ODA_SK_v1.csv
```

## Indexing the Data

The next step is to index the data into Elasticsearch. To do this, we will use Logstash. Logstash is a tool that can ingest data from multiple sources, transform it, and send it to multiple destinations. In this project, we will use Logstash to read the CSV files and send the data to Elasticsearch.

Create a new file called `oda.conf` in the `logstash` directory with the following content:

```conf
input {
  file {
	path => "/path/to/data/*.csv"
	start_position => "beginning"
	sincedb_path => "/dev/null"
  }
}

filter {
  csv {
	separator => ","
	columns => ["latitude","longitude","source_id","id","group_id","street_no","street","str_name","str_type","str_dir","unit","city","postal_code","full_addr","city_pcs","str_name_pcs","str_type_pcs","str_dir_pcs","csduid","csdname","pruid","provider"]
  }
  mutate {
    convert => {
      "latitude" => "float"
      "longitude" => "float"
      "pruid" => "integer"
    }
    rename => {
      "latitude" => "[location][lat]"
      "longitude" => "[location][lon]"
    }
    # we only keep fields: location, city, full_addr, pruid, postal_code, "source_id","id","group_id"
    remove_field => ["latitude","longitude","street_no","street","str_name","str_type","str_dir","unit","city_pcs","str_name_pcs","str_type_pcs","str_dir_pcs","csduid","csdname","provider"]
  }
}

output {
  elasticsearch {
	; index => "canada-addresses-%{+YYYY.MM.dd}"
	index => "canada-addresses-2024.04.05"
	document_id => "%{id}"
	hosts=> "https://localhost:9200" # change to your Elasticsearch host
	user=> "elastic" # change to your Elasticsearch user
	password=> "changeme" # change to your Elasticsearch password
	cacert => "/path/to/your/ca.crt" # change to your Elasticsearch certificate
  }
}
```

Before running Logstash, you need to create an index in Elasticsearch. You can do this by sending a PUT request to the Elasticsearch using the curl command. For example:

```bash
# create an index called "canada-addresses-2024.04.05" with the mapping, you will need to change the hostname, username, password, and certificate path to match your Elasticsearch instance
curl -X PUT "https://localhost:9200/canada-addresses-2024.04.05" -H 'Content-Type: application/json' -u elastic:changeme --cacert /path/to/your/ca.crt -d '{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point"
      },
      "city": {
        "type": "text"
      },
      "full_addr": {
        "type": "text"
      },
      "pruid": {
        "type": "integer"
      },
      "postal_code": {
        "type": "text"
      }
    }
  }
}'
```

Or you can use the Kibana Dev Tools to create the index, Go to the Kibana Dev Tools under the Management tab and run the following command:

```bash
PUT /canada-addresses-2024.04.05
{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point"
      },
      "city": {
        "type": "text"
      },
      "full_addr": {
        "type": "text"
      },
      "pruid": {
        "type": "integer"
      },
      "postal_code": {
        "type": "text"
      }
    }
  }
}
```


After creating the index, you can run Logstash to index the data:

```bash
logstash -f logstash/oda.conf
```

The dataset includes 10 million records, so indexing the data may take some time.

## Building the Address Autocomplete Service

Now that we have indexed the data, we can build the address autocomplete service. The service will provide an endpoint to autocomplete addresses based on the user's input. We will use Node.js, Express, TypeScript, and the Elasticsearch JavaScript client to build the service.

### Setting Up the Project

Create a new directory called `address-autocomplete-api` and navigate to it:

```bash
mkdir address-autocomplete-api
cd address-autocomplete-api
```

Initialize a new Node.js project:

```bash
npm init -y
```

Install the required dependencies:

```bash
npm i express @elastic/elasticsearch dotenv
npm i -D typescript ts-node-dev @types/express nodemon 
```

:::info NOTE
`express` is a web framework for Node.js, `@elastic/elasticsearch` is the official Elasticsearch client for Node.js, `dotenv` is a module to load environment variables from a `.env` file, `typescript` is a superset of JavaScript that adds static types, `ts-node-dev` is a TypeScript execution environment for Node.js, `@types/express` is the TypeScript type definitions for Express, and `nodemon` is a tool to monitor changes in your source code and automatically restart the server.
:::

Initialize a TypeScript configuration file:

```bash
npx tsc --init
```

Create a `.env` file in the root directory with the following content:

```conf
API_PORT=4000 # the port the service will run on
ES_ENDPOINT=https://localhost:9200 # the Elasticsearch endpoint
ES_CA_CERT=./ca.crt # the path to the Elasticsearch certificate
NODE_EXTRA_CA_CERTS=./ca.crt # the path to the Elasticsearch certificate
ES_USERNAME=elastic # the Elasticsearch username
ES_PASSWORD=changeme # the Elasticsearch password
ES_INDEX=canada-addresses-2024.04.05 # the Elasticsearch index you created in the previous step
```

Create a `index.ts` file in the root directory with the following content:

```typescript
import express from 'express'; // [!code ++]
import dotenv from 'dotenv'; // [!code ++]
 // [!code ++]
// load .env file // [!code ++]
dotenv.config(); // [!code ++]
 // [!code ++]
const API_PORT = process.env.API_PORT || 3000; // [!code ++]
 // [!code ++]
const app = express(); // [!code ++]
 // [!code ++]
app.get("/", (req, res) => { // [!code ++]
	res.send("OK"); // [!code ++]
}); // [!code ++]
 // [!code ++]
app.listen(API_PORT, () => { // [!code ++]
	console.log(`Canada Address Autocomplete API is  // [!code ++]running on port ${API_PORT}, http://localhost:${API_PORT}`);
}); // [!code ++]
 // [!code ++]
```

Update the `package.json` file to include the following scripts:

```json
"scripts": {
	"dev": "nodemon index.ts"
}
```

Now you can start the service:

```bash
npm run dev
```

The service will be available at `http://localhost:4000` or the port you specified in the `.env` file. You can test the service by sending a GET request to the `/` endpoint:

```bash
curl http://localhost:4000/
```

You should receive a response with `OK`.

### Adding the Autocomplete Endpoint

Next, we will add an endpoint to autocomplete addresses. 

Before adding the endpoint, we need to load the necessary environment variables. Update the `index.ts` file with the following content:

```typescript
import express from 'express';
import dotenv from 'dotenv';

// load .env file
dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

const ES_ENDPOINT = process.env.ES_ENDPOINT; // [!code ++]
if (!ES_ENDPOINT) { // [!code ++]
	console.error("Missing ES_ENDPOINT environment  // [!code ++]variable");
	process.exit(1); // [!code ++]
} // [!code ++]
 // [!code ++]
const ES_CA_CERT = process.env.ES_CA_CERT; // [!code ++]
if (!ES_CA_CERT) { // [!code ++]
	console.error("Missing ES_CA_CERT environment  // [!code ++]variable");
	process.exit(1); // [!code ++]
} // [!code ++]
 // [!code ++]
const ES_USERNAME = process.env.ES_USERNAME; // [!code ++]
if (!ES_USERNAME) { // [!code ++]
	console.error("Missing ES_USERNAME environment  // [!code ++]variable");
	process.exit(1); // [!code ++]
} // [!code ++]
 // [!code ++]
const ES_PASSWORD = process.env.ES_PASSWORD; // [!code ++]
if (!ES_PASSWORD) { // [!code ++]
	console.error("Missing ES_PASSWORD environment  // [!code ++]variable");
	process.exit(1); // [!code ++]
} // [!code ++]
 // [!code ++]
const ES_INDEX = process.env.ES_INDEX; // [!code ++]
if (!ES_INDEX) { // [!code ++]
	console.error("Missing ES_INDEX environment  // [!code ++]variable");
	process.exit(1); // [!code ++]
} // [!code ++]

const app = express();

app.get("/", (req, res) => {
	res.send("OK");
});

app.listen(API_PORT, () => {
	console.log(`Canada Address Autocomplete API is running on port ${API_PORT}, http://localhost:${API_PORT}`);
});

```

Next, create a Elasticsearch client to connect to the Elasticsearch instance. Update the `index.ts` file with the following content:

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { Client } from '@elastic/elasticsearch'; // [!code ++]
import fs from 'fs'; // [!code ++]

// load .env file
dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

const ES_ENDPOINT = process.env.ES_ENDPOINT;
if (!ES_ENDPOINT) {
	console.error("Missing ES_ENDPOINT environment variable");
	process.exit(1);
}

const ES_CA_CERT = process.env.ES_CA_CERT;
if (!ES_CA_CERT) {
	console.error("Missing ES_CA_CERT environment variable");
	process.exit(1);
}

const ES_USERNAME = process.env.ES_USERNAME;
if (!ES_USERNAME) {
	console.error("Missing ES_USERNAME environment variable");
	process.exit(1);
}

const ES_PASSWORD = process.env.ES_PASSWORD;
if (!ES_PASSWORD) {
	console.error("Missing ES_PASSWORD environment variable");
	process.exit(1);
}

const ES_INDEX = process.env.ES_INDEX;
if (!ES_INDEX) {
	console.error("Missing ES_INDEX environment variable");
	process.exit(1);
}

const app = express();

const esClient = new Client({ // [!code ++]
	node: ES_ENDPOINT, // [!code ++]
	tls: { // [!code ++]
		ca: fs.readFileSync(ES_CA_CERT), // [!code ++]
		rejectUnauthorized: false, // [!code ++]
	}, // [!code ++]
	auth: { // [!code ++]
		username: ES_USERNAME, // [!code ++]
		password: ES_PASSWORD, // [!code ++]
	}, // [!code ++]
}); // [!code ++]


app.get("/", (req, res) => {
	res.send("OK");
});

app.listen(API_PORT, () => {
	console.log(`Canada Address Autocomplete API is running on port ${API_PORT}, http://localhost:${API_PORT}`);
});

```

Now, we can add the autocomplete endpoint. The endpoint will accept query parameters `q`, `lat`, and `lon`. The `q` parameter is the address query, and the `lat` and `lon` parameters are the user's geolocation. The endpoint will return a list of addresses that match the query.

For the address query, we will use the `match_phrase_prefix` query to match the address prefix because we want to sugest addresses that match the user's input before they finish typing.

We will also filter the results to ensure that the address has the required fields (`full_addr`, `city`, and `pruid`).

If the user provides the `lat` and `lon` parameters, we will sort the results by distance from the user's location. Since we have `geo_point` mapping for the `location` field in Elasticsearch, we can leverage the `_geo_distance` sort provided by Elasticsearch to sort the results by distance.

Update the `index.ts` file with the following content:

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { Client } from '@elastic/elasticsearch';
import fs from 'fs';
import { LatLonGeoLocation, QueryDslQueryContainer, SearchRequest, SortCombinations } from '@elastic/elasticsearch/lib/api/typesWithBodyKey'; // [!code ++]

// load .env file
dotenv.config();

const API_PORT = process.env.API_PORT || 3000;

const ES_ENDPOINT = process.env.ES_ENDPOINT;
if (!ES_ENDPOINT) {
	console.error("Missing ES_ENDPOINT environment variable");
	process.exit(1);
}

const ES_CA_CERT = process.env.ES_CA_CERT;
if (!ES_CA_CERT) {
	console.error("Missing ES_CA_CERT environment variable");
	process.exit(1);
}

const ES_USERNAME = process.env.ES_USERNAME;
if (!ES_USERNAME) {
	console.error("Missing ES_USERNAME environment variable");
	process.exit(1);
}

const ES_PASSWORD = process.env.ES_PASSWORD;
if (!ES_PASSWORD) {
	console.error("Missing ES_PASSWORD environment variable");
	process.exit(1);
}

const ES_INDEX = process.env.ES_INDEX;
if (!ES_INDEX) {
	console.error("Missing ES_INDEX environment variable");
	process.exit(1);
}

const app = express();

const esClient = new Client({
	node: ES_ENDPOINT,
	tls: {
		ca: fs.readFileSync(ES_CA_CERT),
		rejectUnauthorized: false,
	},
	auth: {
		username: ES_USERNAME,
		password: ES_PASSWORD,
	},
});


app.get("/autocomplete", async (req, res) => { // [!code ++]
	const { q, lat, lon } = req.query; // [!code ++]
 // [!code ++]
	const filter: QueryDslQueryContainer[] = [ // [!code ++]
		// full_addr, city, pruid are required fields // [!code ++]
		{ exists: { field: "full_addr" } }, // [!code ++]
		{ exists: { field: "city" } }, // [!code ++]
		{ exists: { field: "pruid" } }, // [!code ++]
	]; // [!code ++]
	const query: QueryDslQueryContainer = { // [!code ++]
		bool: { // [!code ++]
			must: [ // [!code ++]
				{ // [!code ++]
					// match_phrase_prefix will match  // [!code ++]"123 Main St" with "123 Main Street"
					match_phrase_prefix: { full_addr:  // [!code ++]q?.toString() || "", },
				}, // [!code ++]
			], // [!code ++]
			filter, // [!code ++]
		}, // [!code ++]
	} // [!code ++]
	const sort: SortCombinations[] = []; // [!code ++]
	const searchRequestBody: SearchRequest['body'] = { // [!code ++]
		_source: ["full_addr", "city", "postal_code",  // [!code ++]"pruid", "location"],
		query, // [!code ++]
		sort, // [!code ++]
	}; // [!code ++]
	// if user provides lat and lon, sort by distance // [!code ++]
	if (lat && lon) { // [!code ++]
		const location: LatLonGeoLocation = { // [!code ++]
			lon: parseFloat(lon.toString()), // [!code ++]
			lat: parseFloat(lat.toString()), // [!code ++]
		} // [!code ++]
		sort.push({ // [!code ++]
			_geo_distance: { // [!code ++]
				location, // [!code ++]
				order: "asc", // [!code ++]
				unit: "km", // [!code ++]
				mode: "min", // [!code ++]
				distance_type: "plane", // [!code ++]
				ignore_unmapped: true, // [!code ++]
			}, // [!code ++]
		}); // [!code ++]
	} // [!code ++]
 // [!code ++]
	try { // [!code ++]
		const result = await esClient.search({ // [!code ++]
			index: ES_INDEX, // [!code ++]
			size: 20, // [!code ++]
			body: searchRequestBody, // [!code ++]
		}); // [!code ++]
 // [!code ++]
		const addresses: Address[] = result.hits.hits. // [!code ++]map((hit) => {
			const address = hit._source as Address; // [!code ++]
			const { full_addr, city, pruid,  // [!code ++]postal_code, location } = address;
			// distance is the first element in the  // [!code ++]sort array
			const distance = hit.sort?.[0]; // [!code ++]
			return { // [!code ++]
				full_addr, // [!code ++]
				city, // [!code ++]
				pruid, // [!code ++]
				postal_code, // [!code ++]
				location, // [!code ++]
				distance // [!code ++]
			}; // [!code ++]
		}); // [!code ++]
 // [!code ++]
		res.json(addresses); // [!code ++]
	} catch (error) { // [!code ++]
		console.error(error); // [!code ++]
		res.status(500).json({ error: "Internal Server  // [!code ++]Error" });
	} // [!code ++]
}); // [!code ++]

app.get("/", (req, res) => {
	res.send("OK");
});

app.listen(API_PORT, () => {
	console.log(`Canada Address Autocomplete API is running on port ${API_PORT}, http://localhost:${API_PORT}`);
});


// Types  // [!code ++]
type Pruid = 10 | 11 | 12 | 13 | 24 | 35 | 46 | 47 | 48 | 59 | 60 | 61 | 62; // [!code ++]
interface Address {  // [!code ++]
	full_addr: string;  // [!code ++]
	city: string;  // [!code ++]
	pruid: Pruid;  // [!code ++]
	postal_code?: string;  // [!code ++]
	location: LatLonGeoLocation;  // [!code ++]
}  // [!code ++]

```

Now you can start the service:

```bash
npm run dev
```

The service will be available at `http://localhost:4000` or the port you specified in the `.env` file. You can test the service by sending a GET request to the `/autocomplete` endpoint with the query parameter `q`:

```bash
curl http://localhost:4000/autocomplete?q=123%20Main%20St
```

You will receive a JSON response with the addresses that match the query.

```json
[
  {
    "full_addr": "123 MAIN ST",
    "city": "RESERVE MINES",
    "pruid": 12,
    "postal_code": null,
    "location": {
      "lon": "-60.01856",
      "lat": "46.18440"
    }
  },
  {
    "full_addr": "123 MAIN ST",
    "city": "SPRINGHILL",
    "pruid": 12,
    "postal_code": null,
    "location": {
      "lon": "-64.05301",
      "lat": "45.65114"
    }
  }
]
```

The `autocomplete` endpoint also supports specifying the geolocation of the user to return results closer to the user. You can pass the `lat` and `lon` query parameters to the endpoint. For example:

```bash
curl http://localhost:4000/autocomplete?q=123%20Main%20St&lat=43.65114&lon=-79.05301
```

You will receive a JSON response with the addresses that match the query and are sorted by distance from the user's location.

```json
[
  {
    "full_addr": "123 Main St",
    "city": "Markham",
    "pruid": 35,
    "postal_code": null,
    "location": {
      "lon": "-79.26074",
      "lat": "43.87854"
    },
    "distance": 30.29256914280844
  },
  {
    "full_addr": "123 Main St",
    "city": "Markham",
    "pruid": 35,
    "postal_code": null,
    "location": {
      "lon": "-79.30980",
      "lat": "43.86351"
    },
    "distance": 31.352539804009215
  },
  {
    "full_addr": "123 Main St",
    "city": "Liverpool",
    "pruid": 12,
    "postal_code": null,
    "location": {
      "lon": "-64.71274",
      "lat": "44.03990"
    },
    "distance": 1150.830347120216
  }
]
```

:::info NOTE 

- The `distance` field is only returned when the `lat` and `lon` query parameters are provided. And the distance is in kilometers.
- The `pruid` field is the province ID. You can find the list of province IDs [here](https://www150.statcan.gc.ca/n1/pub/92-500-g/2016002/tbl/tbl_4.6-eng.htm).
- The `postal_code` field may not always be available in the dataset.
:::

## Conclusion

In this blog post, we built a privacy-focused address autocomplete service using Elasticsearch. We indexed address data from the Open Database of Addresses (ODA) into Elasticsearch, created an address autocomplete API using Node.js and Express, and used the Elasticsearch JavaScript client to query the data. By building our own address autocomplete service, we can ensure that user data is not shared with third parties and avoid potential costs associated with third-party services.

## Source Code

The completed code in this blog is available on [GitHub](https://github.com/huajiejin/canada-address-autocomplete-api)

## License

- The Open Database of Addresses (ODA) is a collection of open address point data and is made available under the [Open Government License - Canada.](https://open.canada.ca/en/open-government-licence-canada)
