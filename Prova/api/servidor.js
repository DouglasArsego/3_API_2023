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


// =============== Cidades =============== // 

// Cadastro de Cidade
servidor.post("/cidades", (req, res, next) => {
    knex('cidades')
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send(new errors.BadRequestError('Erro ao cadastrar a cidade!'));
            }
            res.send( "Cidade cadastrada com sucesso!" );
        } , next );
} );

// Consulta Tabela de Cidades
servidor.get("/cidades" , (req, res, next) => {
    knex('cidades').then( (dados)=>{
        res.send( dados );
    } , next );
});

// Consulta Cidade Especifica
servidor.get("/cidades/:id" , (req, res, next) => {
    const idCidades = req.params.id;
    knex('cidades')
        .where('id' , idCidades )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cidade não encontrada!') );
            }
            res.send( dados );
        } , next );
});

// Editar Cidades
servidor.put("/cidades/:id", (req, res, next) => {
    const idCidades = req.params.id;
    knex('cidades')
        .where('id' , idCidades )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cidade não encontrada!') );
            }
            res.send( "Cidade editada com sucesso!" );
        } , next );
} );


// Deletar Cidades
servidor.del("/cidades/:id", (req, res, next) => {
    const idCidades = req.params.id;
    knex('cidades')
        .where('id' , idCidades )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cidade não encontrada!') );
            }
            res.send( "Cidade deletada com sucesso!" );
        } , next );
} );

// =============== Clientes =============== // 

// Cadastro de Cliente
servidor.post("/clientes", (req, res, next) => {
    knex('clientes')
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send(new errors.BadRequestError('Erro ao se cadastrar!'));
            }
            res.send( "Cliente cadastrado com sucesso!" );
        } , next );
} );

// Consulta Tabela de Clientes
servidor.get("/clientes" , (req, res, next) => {
    knex('clientes').then( (dados)=>{
        res.send( dados );
    } , next );
});

// Consulta Cliente Especifico
servidor.get("/clientes/:id" , (req, res, next) => {
    const idClientes = req.params.id;
    knex('clientes')
        .where('id' , idClientes )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cliente não encontrado!') );
            }
            res.send( dados );
        } , next );
});

// Editar Clientes
servidor.put("/clientes/:id", (req, res, next) => {
    const idClientes = req.params.id;
    knex('clientes')
        .where('id' , idClientes )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cliente não encontrado!') );
            }
            res.send( "Cliente editado com sucesso!" );
        } , next );
} );


// Deletar Clientes
servidor.del("/clientes/:id", (req, res, next) => {
    const idClientes = req.params.id;
    knex('clientes')
        .where('id' , idClientes )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Cliente não encontrado!') );
            }
            res.send( "Cliente deletado com sucesso!" );
        } , next );
} );


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

// Cadastra Produtos
servidor.post("/produtos", (req, res, next) => {
    knex('produtos')
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send(new errors.BadRequestError('Erro ao inserir o produto!'));
            }
            res.send( "Produto cadastrado com sucesso!" );
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
            res.send( "Produto editado com sucesso!" );
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
            res.send( "Produto deletado com sucesso!" );
        } , next );
} );


// =============== Pedidos =============== // 

// Cadastra Pedido
servidor.post("/pedidos", (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Erro ao inserir o pedido!'));
            }
            res.send("Pedido cadastrado com sucesso!");
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

// Editar Pedidos
servidor.put("/pedidos/:id", (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id' , idPedido )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Pedido não encontrado!') );
            }
            res.send( "Pedido editado com sucesso!" );
        } , next );
} );

// Deletar Pedidos
servidor.del("/pedidos/:id", (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id' , idPedido )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Pedido não encontrado!') );
            }
            res.send( "Pedido deletado com sucesso!" );
        } , next );
} );


// =============== Pedidos_Produtos =============== // 

// Cadastra Pedidos_Produtos
servidor.post("/pedidos_produtos", (req, res, next) => {
    knex('pedidos_produtos')
        .insert(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Erro ao inserir o pedido_produto!'));
            }
            res.send("Pedido_Produto cadastrado com sucesso!");
        } , next );
} );

// Consulta Tabela de Pedidos_Produtos
servidor.get("/pedidos_produtos" , (req, res, next) => {
    knex('pedidos_produtos').then( (dados)=>{
        res.send( dados );
    } , next );
});


// Editar Pedidos_Produtos
servidor.put("/pedidos_produtos/:id", (req, res, next) => {
    const idPedPod = req.params.id;
    knex('pedidos_produtos')
        .where('id' , idPedPod )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Pedido_Produto não encontrado!') );
            }
            res.send( "Pedido_Produto editado com sucesso!" );
        } , next );
} );

// Deletar Pedidos_Produtos
servidor.del("/pedidos_produtos/:id", (req, res, next) => {
    const idPedProd = req.params.id;
    knex('pedidos_produtos')
        .where('id' , idPedProd )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Pedidos_Produtos não encontrado!') );
            }
            res.send( "Pedidos_Produtos deletado com sucesso!" );
        } , next );
} );

// =============== Categorias =============== // 

// Cadastra Categoria
servidor.post("/categorias", (req, res, next) => {
    knex('categorias')
        .insert(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Erro ao inserir a categoria!'));
            }
            res.send("Categoria cadastrada com sucesso!");
        } , next );
} );

// Consulta Tabela de Categorias
servidor.get("/categorias" , (req, res, next) => {
    knex('categorias').then( (dados)=>{
        res.send( dados );
    } , next );
});

// Consulta Categoria Especifica
servidor.get("/categorias/:id" , (req, res, next) => {
    const idCategorias = req.params.id;
    knex('categorias')
        .where('id', idCategorias)
        .first()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Categoria não encontrada!'));
            }
            res.send(dados);
        }, next);
});

// Editar Categoria
servidor.put("/categorias/:id", (req, res, next) => {
    const idCategorias = req.params.id;
    knex('categorias')
        .where('id' , idCategorias )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Categoria não encontrada!') );
            }
            res.send( "Categoria editada com sucesso!" );
        } , next );
} );

// Deletar Categoria
servidor.del("/categorias/:id", (req, res, next) => {
    const idCategorias = req.params.id;
    knex('categorias')
        .where('id' , idCategorias )
        .delete()
        .then( (dados)=>{
            if( !dados ){
                return res.send( new errors.BadRequestError('Categoria não encontrada!') );
            }
            res.send( "Categoria deletada com sucesso!" );
        } , next );
} );


