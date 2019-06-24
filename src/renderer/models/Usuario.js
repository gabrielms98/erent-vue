module.exports = function(sequelize, Sequelize){
    var Usuario = sequelize.define('Usuario', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        login: Sequelize.STRING,
        senha: Sequelize.STRING,
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        email: Sequelize.STRING,
        imagem: Sequelize.STRING,
        cpf: Sequelize.STRING,
        documento: Sequelize.STRING,
        selfie: Sequelize.STRING
    },
    {
        indexes: [{fields: ['id']}]
    });

    return Usuario;
}