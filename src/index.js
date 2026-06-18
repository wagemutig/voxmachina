// VoxMachina — entry point
const agent = process.argv.find(a => a === '--agent');
const name = agent ? process.argv[process.argv.indexOf(agent) + 1] : 'barker';
console.log(`Starting VoxMachina with agent: ${name}`);
