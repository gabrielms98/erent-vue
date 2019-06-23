module.exports = function(sequelize, Sequelize){
    var Avaliacao = sequelize.define('Avaliacao', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nota: Sequelize.INTEGER,
        comentario: Sequelize.STRING,
        idUsuario: Sequelize.INTEGER,
        idImovel: Sequelize.INTEGER
    },
    {
        indexes: [{fields: ['id']}]
    });

    return Avaliacao;
}