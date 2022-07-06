var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'InventoryApp',
  description: 'Windows inventory service',
  script: 'C:\\Users\\krzysztof\\Desktop\\inventory-app\\windows-agent\\src\\app.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',() => {
  console.log("service has installed...");
  svc.start();
  console.log("service has stared...");
});

svc.install();
