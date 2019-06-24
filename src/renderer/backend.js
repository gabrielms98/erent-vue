const Sequelize = require('sequelize');
const remote = require('electron').remote;
const Op = Sequelize.Op;

//helper functions

//global vars/objects
var models;

const sequelize = new Sequelize('erent-bd', 'user-erent', 'engenharia1', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 5432,
  storage: 'erentdb.db'
});

const fatal_error = err => {remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao conectar com o banco de dados!', message: 'Se voce é o dono do aplicativo, verifique se o banco de dados esta online ou se os parametros de conexão do sequelize estão corretos'});remote.getCurrentWindow().close();}


const sync = () => sequelize.sync();
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
  backend.install.synced = true;
};

sequelize.authenticate().then(loadmodels, err => fatal_error(err));


//main object
const backend = {
  install: (Vue, options) => {
    Vue.prototype.$backend = {

        synced: false,
        
        addUsuario(usuario, callback=null){
            models.Usuario.create({
                login: usuario.login,
                senha: usuario.senha,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                imagem: usuario.imagem,
                cpf: usuario.cpf,
                documento: usuario.documento,
                selfie: usuario.selfie
            }).then(usuario_criado => callback(usuario_criado));
        }
    }
  }
}

export default backend
