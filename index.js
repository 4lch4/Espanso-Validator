const core = require('@actions/core')
const github = require('@actions/github')
const { readdir, stat } = require('fs/promises')

/**
 * Gets all of the files from the given directory by recursively calling itself
 * should one of the files be a directory.
 *
 * @param dirPath The root directory to retrieve files from.
 * @param files An array of files that have been found so far.
 * @returns A string array of all files & folders in the directory.
 */
async function getAllFiles(dirPath, files = []) {
  // Iterate through all files in the directory.
  for (const file of await readdir(dirPath)) {
    // Check if the file is a directory.
    const { isDirectory } = await stat(join(dirPath, file))

    // If it _is_ a directory, recursively call this function to resolve the
    // nested files.
    if (isDirectory()) files = await getAllFiles(join(dirPath, file), files)
    // Else, push the file to the returned array.
    else files.push(join(dirPath, file))
  }

  return files
}

const main = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet')
    console.log(`Hello ${nameToGreet}!`)

    const time = new Date().toTimeString()
    core.setOutput('time', time)

    const files = await getAllFiles('.')
    core.info(`Found ${files.length} files...`)

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
  .then(res => {
    core.info(res)
    core.info('done')
  })
  .catch(err => console.error(err))
