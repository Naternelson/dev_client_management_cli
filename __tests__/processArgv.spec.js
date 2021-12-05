import processArgv from "../lib/processArgv"

const mockArgv = (...arr) =>  ["node", "path", ...arr]
// import {jest} from "@jest/globals"
// jest.useFakeTimers()

describe("ProcessArgv function", () => {
    const schema = {
        skipPrompts: {
            flags: ["--yes", "-y"],
            defaultValue: false, 
            type: Boolean
        },
        git: {
            flags: ["--git", "-g"],
            defaultValue: false, 
            type: Boolean
        },
        template: {
            index: 0
        },
        runInstall: {
            flags: ["--install", "-i"],
            defaultValue: false, 
            type: Boolean
        }
    }
    const optionMapper = processArgv(schema)
    it("should return a formated object", ()=> {
        const options = optionMapper(mockArgv("new-project", "--install", "-g"))
        expect(options.skipPrompts).toBe(false)
        expect(options.git).toBe(true)
        expect(options.template).toBe("new-project")
        expect(options.runInstall).toBe(true)
    })
})