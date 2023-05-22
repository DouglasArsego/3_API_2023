const restify = require("restify");
const errors = require("restify-errors");
const servidor = restify.createServer({
    name : 'loja_dsapi' ,
    version : '1.0.0'
});

servidor.use( restify.plugins.acceptParser(servidor.acceptable) );
servidor.use( restify.plugins.queryParser() );
servidor.use( restify.plugins.bodyParser() );

servidor.listen(8001, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
} );


// Conecta Servidor
const knex = require("knex")({
    client : 'mysql' ,
    connection : {
        host : 'localhost' ,
        user : 'root' ,
        password : '' ,
        database : 'loja_dsapi'
    }
});

// Consulta Servidor
servidor.get("/", (req, res, next) => {
    res.send("Bem-vindo à nossa Loja!");
    next();
});


// =============== Clientes =============== // 

// Cadastro de Cliente
servidor.post("/clientes", (req, res, next) => {
    knex('clientes')
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send(new errors.BadRequestError('Erro ao se cadastrar!'));
            }
            res.send( "Cadastro realizado com sucesso!" );
        } , next );
} );

// Consulta Tabela de Clientes
servidor.get("/clientes" , (req, res, next) => {
    knex('clientes').then( (dados)=>{
        res.send( dados );
    } , next );
});


// =============== Produtos =============== // 

// Consulta Tabela de Produtos
servidor.get("/produtos" , (req, res, next) => {
    knex('produtos').then( (dados)=>{
        res.send( dados );
    } , next );
});

// Consulta Produto Especifico
servidor.get("/produtos/:id" , (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id' , idProduto )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( dados );
        } , next );
});


// Adicionar Produtos
servidor.post("/produtos", (req, res, next) => {
    knex('produtos')
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send(new errors.BadRequestError('Erro ao inserir o produto!'));
            }
            res.send( "Produto inserido!" );
        } , next );
} );

// Editar Produtos
servidor.put("/produtos/:id", (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id' , idProduto )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( "Produto editado!" );
        } , next );
} );


// Deletar Produtos
servidor.del("/produtos/:id", (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id' , idProduto )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Produto não encontrado!') );
            }
            res.send( "Produto deletado!" );
        } , next );
} );


// =============== Pedidos =============== // 

// Realiza Pedido
servidor.post("/pedidos", (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Erro ao inserir o pedido!'));
            }
            res.send("Pedido Realizado!");
        } , next );
} );


// Consulta Tabela de Pedidos
servidor.get("/pedidos" , (req, res, next) => {
    knex('pedidos').then( (dados)=>{
        res.send( dados );
    } , next );
});

// Consulta Pedido Especifico
servidor.get("/pedidos/:id" , (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido)
        .first()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }
            res.send(dados);
        }, next);
});






