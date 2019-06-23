module.exports = function(sequelize, Sequelize){
    var Imovel = sequelize.define('Imovel', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        titulo: Sequelize.STRING,
        descricao: Sequelize.STRING,
        valor: Sequelize.INTEGER,
        imagens: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        rua: Sequelize.STRING,
        numero: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        acessibilidade: Sequelize.STRING,
        comodos: Sequelize.INTEGER,
        regras: Sequelize.STRING,
        idUsuario: Sequelize.INTEGER
    },
    {
        indexes: [{fields: ['id']}]
    });

    return Imovel;
}