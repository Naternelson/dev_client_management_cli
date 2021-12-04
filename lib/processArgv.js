import arg from 'arg'

export default function processArgv(schema){
    const flags = {}
    for(const key in schema){
        schema[key].flags.forEach((flag, index)=>{
            if(index === 0) flags[flag] = schema[key].type 
            else flags[flag] = schema[key].flags[0]
        })
    }
    return (argv) => {
        const args = arg({...flags}, {argv: argv.slice(2)})
        return Object.keys(schema).reduce((obj, key)=>{
            const flag = schema[key].flags[0]
            const index = schema[key].index 
            const defaultValue = schema[key].defaultValue
            obj[key] = index ? args._[index] : args[flag] ? args[flag] : defaultValue  
            return obj
        }, {})
    }
}