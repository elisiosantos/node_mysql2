const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")


const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended:true
}))



app.use(express.json())

app.post("/register/save", (request, response) =>{
    const {title, pageqty} = request.body

 

    const query = `INSERT INTO books (title,pageqty) VALUES('${title}',${pageqty}')`

    conn.query(query, (error) =>{
        if(error){
            console.log(error)
            return
        }

        response.redirect("/")
    })

})

app.get("/register", (request, response)=>{
    response.render("register")
})


app.get("/", (requisicao, response)=>{
    const sql= 'SELECT * FROM books'

    conn.query(sql,(error,data)=>{
        if(error){
            return console.log(error)
        }

        const books= data
        console.log(books)
        response.render("home", {books})
    })
})


const conn = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"root",
    database:"nodemysql",
    port:3307
})

conn.connect((error)=>{
    if(error){
        console.log(error)
        return
    }
    console.log("conectando o mysql")
    app.listen(3000, ()=>{
        console.log("Servidor rodando")
    })
})