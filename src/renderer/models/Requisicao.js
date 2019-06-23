module.exports = function(sequelize, Sequelize){
    var Requisicao = sequelize.define('Requisicao', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        data: Sequelize.DATEONLY,
        idUsuario: Sequelize.INTEGER,
        idImovel: Sequelize.INTEGER
    },
    {
        indexes: [{fields: ['id']}]
    });
    
    return Requisicao;
}