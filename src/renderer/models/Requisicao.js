module.exports = function(sequelize, Sequelize){
    var Requisicao = sequelize.define('Requisicao', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        data: Sequelize.DATEONLY,
        idUsuario: Sequelize.INTEGER,
        idImovel: Sequelize.INTEGER,
        status: Sequelize.ENUM('1', '2', '3') //1: confirmado, 2: pendente, 3: recusado
    },
    {
        indexes: [{fields: ['id']}]
    });
    
    return Requisicao;
}