module.exports = function(sequelize, Sequelize){
  var models = {}

  models.Usuario = require('./Usuario')(sequelize, Sequelize);
  models.Imovel = require('./Imovel')(sequelize, Sequelize);
  models.Avaliacao = require('./Avaliacao')(sequelize, Sequelize);
  models.Requisicao = require('./Requisicao')(sequelize, Sequelize);
  models.Contrato = require('./Contrato')(sequelize, Sequelize);
  models.Notificacao = require('./Notificacao')(sequelize, Sequelize);

  return models;
}
