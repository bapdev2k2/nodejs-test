const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDServices')
const getHomePage = async(req, res) => {

    let results = await getAllUsers();
    return res.render('home.ejs', { listusers: results })
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getBap = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async(req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    console.log(">>> email = ", email, 'name= ', name, 'city= ', city)
        //     INSERT INTO Users(email,name,city)
        // VALUES ('sam@gmail.com', 'sam', 'Bac Ninh');

    // connection.query(
    //     `INSERT INTO Users(email,name,city) 
    //      VALUES (?, ?, ?);`, [email, name, city],
    //     function(err, results) {
    //         res.send('Created user success!')
    //     }
    // )

    let [results, fields] = await connection.query(
        `INSERT INTO Users(email,name,city) 
         VALUES (?, ?, ?);`, [email, name, city]
    );

    console.log(">>> check results: ", results)
    res.send('Created user success!')



}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async(req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId)

    res.render('edit.ejs', { userEdit: user }) //x <- y
}

const postUpdateUser = async(req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    console.log(">>> email = ", email, 'name= ', name, 'city= ', city)

    await updateUserById(email, name, city, userId)

    // res.send('Update user success!')
    res.redirect('/');
}

const postDeleteUser = async(req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId)
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async(req, res) => {
    const id = req.body.userId;
    await deleteUserById(id);


    res.redirect('/');
}

module.exports = {
    getHomePage,
    getABC,
    getBap,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser

}