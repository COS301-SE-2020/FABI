const Pool = require('pg').Pool
const poolConfig = {
    user: '?',
    host: '?',
    database: '?',
    password: '?',
    port: '?'
}
const pool = new Pool(poolConfig)

CSVFromJson = (results) => {
    // convert JSON to CSV
    const items = results.rows
    //console.log(results)
    const replacer = (key, value) => value === null ? '' : value// specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName]).replace(/null/g, '').replace(/\,/g,'|')).join(','))
    //console.log(csv)
    csv.unshift(header.join(','))
    //console.log(csv)
    csv = csv.join('\r\n')
    //console.log(csv)
    return csv

};

CSVToQuery = (results) => {
    // convert JSON to CSV
    const items = results.rows
    //console.log(results)
    const replacer = (key, value) => value === null ? '' : value// specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName]).replace(/null/g, '').replace(/\,/g,'|')).join(','))
    //console.log(csv)
    csv.unshift(header.join(','))
    //console.log(csv)
    csv = csv.join('\r\n')
    //console.log(csv)
    return csv

};

const getReports = (req, res) => {
    
    pool.query('SELECT email, form, "Long", "Lat", "Pname", "Infliction", "Accuracy", "Pscore", date, urgency, diagnosis FROM reports where date < 20200725', (error, results) => { // ORDER BY id ASC

        if (error) {
            throw error
        }else{
            //console.log(results)
            //console.log(results)
            let csv = CSVFromJson(results/*this.state.csvArrayOfJson*/)
            console.log(csv)
            //res.rows = csv;
            return res.json(csv);//JSON.parse(csv);//return JSON.parse(csv).access//JSON.parse(res.json(csv));//return res.json(csv);
        }
        res.status(200).json(results.rows)
    })
}

const uploadReports = (req, res) => {

    pool.query('SELECT email, form, "Long", "Lat", "Pname", "Infliction", "Accuracy", "Pscore", date, urgency, diagnosis FROM reports where date < 20200725', (error, results) => { // ORDER BY id ASC

        if (error) {
            throw error
        } else {
            
        }
        res.status(200).json(results.rows)
    })
}

/*const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name, email} = req.body
    pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)',
        [name, email],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User added with id: ${results.insertId}`)
        }
    )
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, email} = req.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User modified with id: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User deleted with id: ${id}`)
        }
    )
}*/

module.exports = {
    //getUserById,
    getReports,
    //createUser,
    //updateUser,
    //deleteUser
}