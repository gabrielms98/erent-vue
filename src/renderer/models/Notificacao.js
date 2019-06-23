module.exports = function(sequelize, Sequelize){
    var Notificacoes = sequelize.define('Notificacoes', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        conteudo: Sequelize.STRING,
        data: Sequelize.DATEONLY,
        visualizado: Sequelize.BOOLEAN,
        idUsuario: Sequelize.INTEGER
    },
    {
        indexes: [{fields: ['id']}]
    });

    return Notificacoes;
}