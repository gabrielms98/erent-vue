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
        
        addUsuario(callback=null){
            models.Usuario.create({
                id: 1,
                login: "gabrielms98",
                senha: "ricsoncuzao",
                nome: "gb",
                sobrenome: "batata",
                email: "gmbiel1@gmail.com",
                imagem: __dirname + "/assets/foto.png",
                cpf: "13747530680",
                documento: "25cm",
                selfie: __dirname + "/assets/foto2.png"
            }).then(usuario_criado => callback(usuario_criado));
        }
    }
  }
}

export default backend
