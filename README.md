# Reports web-component

## Getting Started
To run the code I use [static-server](https://github.com/nbluis/static-server). 

To install:
```sh
npm -g install static-server
```
Now go to the index.html directory and run:
```sh
$ static-server
```

For obtaining the data to show I use [JSON Server](https://github.com/typicode/json-server) as a fake REST service, wich returns the data inserted in db.json. 

To install just:
```sh
npm install -g json-server
```

To run execute this where the db.json file is:
```sh
json-server --watch db.json
```

Then navigate to [localhost](http://localhost:9080/).
