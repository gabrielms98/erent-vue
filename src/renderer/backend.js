const Sequelize = require('sequelize');
const remote = require('electron').remote;
const Op = Sequelize.Op;

require('dotenv').config();

//helper functions

//global vars/objects
var models;


//=============== REMOTE MYSQL DATABASE ===============//
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_SCHEMA, process.env.DATABASE_PWD, {
  host: process.env.DATABASE_URL,
  dialect: 'mysql',
  operatorsAliases: false,
  port: process.env.DATABASE_PORT,
  storage: process.env.DATABASE_STORAGE
});

const fatal_error = err => {remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao conectar com o banco de dados!', message: 'Se voce é o dono do aplicativo, verifique se o banco de dados esta online ou se os parametros de conexão do sequelize estão corretos!'});remote.getCurrentWindow().close();}


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
        addImovel(imovel, callback=null){
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
        addContrato(obj, callback=null){
          models.Contrato.create({
            status: obj.status,
            metodoPagamento: obj.metodoPagamento,
            idUsuario: obj.idUsuario,
            idImovel: obj.Imovel,
            data: obj.data
          }).then(contrato => callback(contrato));
        },

        getAllContratosByUser(uid, callback=null){
          models.Contrato.findAll({where: {idUsuario: uid}})
          .then(all_contrato => callback(all_contrato));
        },



        //=============REQUISICAO=============//
        addRequest(req, callback=null){
          models.Requisicao.create({
            data: req.data,
            idUsuario: req.idUsuario,
            idImovel: req.idImovel,
            status: req.status
          }).then(req => callback(req));
        },

        getRequestById(rid ,callback=null){
          models.Requisicao.findOne({where: {id: rid}})
          .then(requisicao => callback(requisicao));
        },

        getAllRequests(callback=null){
          models.Requisicao.findAll()
          .then(all_req => callback(all_req));
        },

        changeRequestStatus(ustatus, uid, callback=null){
          models.Requisicao.update(
            { status: ustatus},
            { where: {id: uid}}
          ).then(() => callback());
        }
    }
  }
}

export default backend
