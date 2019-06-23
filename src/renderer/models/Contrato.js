module.exports = function(sequelize, Sequelize){
    var Contrato = sequelize.define('Contrato', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        valor: Sequelize.INTEGER,
        status: Sequelize.ENUM('1', '2', '3'),
        metodoPagamento: Sequelize.ENUM('1', '2'),
        idUsuario: Sequelize.INTEGER,
        idImovel: Sequelize.INTEGER
    },
    {
        indexes: [{fields: ['id']}]
    });

    return Contrato;
}