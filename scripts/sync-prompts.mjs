import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,relative} from 'node:path';
const root=process.cwd();
const catalog=readFileSync('prompts/catalog.yaml','utf8');
const entries=[...catalog.matchAll(/- id: (\S+)\n(?:.*\n)*?    file: (\S+)/g)];
if(entries.length!==(catalog.match(/- id:/g)??[]).length)throw new Error('Unsupported prompt catalog shape');
const prompts={};
for(const [,id,file] of entries){
 const path=resolve(root,'prompts',file);
 if(relative(resolve(root,'prompts'),path).startsWith('..'))throw new Error('Prompt path escapes catalog');
 if(Object.hasOwn(prompts,id))throw new Error('Duplicate prompt ID');
 prompts[id]=readFileSync(path,'utf8');
}
const output='// Generated from prompts/; provenance is recorded in docs/migration/prompt-catalog.json.\nexport const BUNDLED_PROMPTS: Readonly<Record<string, string>> = '+JSON.stringify(prompts,null,2)+';\n';
if(process.argv.includes('--check')){
 if(readFileSync('src/core/bundledPrompts.ts','utf8')!==output)throw new Error('Run npm run sync:prompts to update the bundled catalog');
 console.log(`Verified ${entries.length} bundled prompts`);
}else writeFileSync('src/core/bundledPrompts.ts',output);
