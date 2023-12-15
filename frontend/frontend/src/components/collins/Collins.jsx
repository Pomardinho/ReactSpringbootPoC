function Collins() {
    const collinsDictionary = require('collins')
    const serverName = "www.collinsdictionary.com/api" // ? api.collinsdictionary.com
    const accessKey = ""

    var dictionary = new collinsDictionary(serverName, accessKey)

    console.log(dictionary.dictionaries())

    return (
        <div className="container text-light">
            <h1>Hello</h1>
        </div>
    )
}

export default Collins