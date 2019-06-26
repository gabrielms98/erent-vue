const Sequelize = require('sequelize');
const remote = require('electron').remote;
const Op = Sequelize.Op;

//helper functions

//global vars/objects
var models;

/*const sequelize = new Sequelize('erent-bd', 'user-erent', 'engenharia1', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 5432,
  storage: 'erentdb.db'
});*/

//=============== REMOTE MYSQL DATABASE ===============//
const sequelize = new Sequelize('bLtEva7XWB', 'bLtEva7XWB', 'p6JDUZ0ku8', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 3306,
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

        //=============USUARIO=============//
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
        },

        getUsuarioByCPF(uid, callback=null){
          models.Usuario.findOne({where: {cpf: uid}})
          .then(usuario => callback(usuario));
        },

        getUsuarioById(uid, callback=null){
          models.Usuario.findOne({where: {id: uid}})
          .then(user => callback(user));
        },

        //=============IMOVEL=============//
        addImovel(imovel, callbakc=null){
          models.imovel.create({
            titulo: imovel.titulo,
            descricao: imovel.descricao,
            valor: imovel.valor,
            imagens: imovel.imagens,
            status: imovel.status,
            rua: imovel.rua,
            numero: imovel.numero,
            bairro: imovel.bairro,
            cidade: imovel.cidade,
            complemento: imovel.complemento,
            estado: imovel.estado,
            acessibilidade: imovel.acessibilidade,
            comodos: imovel.comodos,
            regras: imovel.regras,
            idUsuario: imovel.idUsuario
          }).then(imovel_criado => callback(imovel_criado));
        },

        getAllImoveis(callback=null){
          models.Imovel.findAll()
          .then(all_imoveis => callback(all_imoveis));
        },

        getImovelById(iid, callback=null){
          models.Imovel.findOne({where: {id: iid}})
          .then(imovel => callback(imovel));
        },

        //=============NOTIFICACAO=============//
        getAllNotificationsUser(uid, callback=null){
          models.Notificacao.findAll({where: {idUsuario: uid}})
          .then(all_notifications => callback(all_notifications));
        },

        addNotificacao(notf, callback=null){
          models.Notificacao.create({
            conteudo: notf.conteudo,
            data: notf.data,
            visualizado: false,
            idUsuario: notf.idUsuario
          })
        },

        markAllAsRead(uid,  callback=null){
          models.Notificacao.update(
            {visualizado: 1},
            {where: {idUsuario: uid}}
          ).then(() => callback())
        },

        //=============AVALIACAO=============//



        //=============CONTRATO=============//


        
        //=============REQUISICAO=============//
        addRequest(req, callback=null){
          models.Requisicao.create({
            data: req.data,
            idUsuario: req.idUsuario,
            idImovel: req.idImovel
          }).then(req => callback(req));
        }
    }
  }
}

export default backend
