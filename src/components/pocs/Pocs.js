import React, { Component } from 'react';
import './Pocs.css';

/**************************
 * Single element
 * ***********************/
var app = React.createElement('h1', null, 'Hola mundo');
var domElement = document.getElementById('root');

/**************************
 * Single component
 * ***********************/
class Encabezado extends Component {
    render() {
        return React.createElement(
            'h1',
            null,
            'Mi pagina: ' + this.props.nombre
        )
    }
};

class Menu extends Component {
    render(){
        return React.createElement('ul', {className: 'menu'},
            React.createElement('li', null, 'inicio'),
            React.createElement('li', null, 'about'),
            React.createElement('li', {
                onClick: function(ev){
                    if(this.props.habilitado){
                        this.props.onClick(ev);
                    }
                }.bind(this)
            }, 'faqs')
        )
    }
};

class Contenido extends Component {
    render() {
        return React.createElement(
            'div',
            {className: 'contenido'},
            React.Children.map(this.props.children, function(ele){
                return React.createElement('div', null, ele)
            })
        );
    }
};

/**************************
 * Single events
 * ***********************/
class Contador extends Component {
    render(){
        return React.createElement('div', null,
            React.createElement('p', null, 'La cuenta actual es: ', this.props.cuenta),
            React.createElement('input', {
                type: 'button',
                value: 'Incrementar',
                onClick: this.props.onIncrementar
            }),
            React.createElement('input', {
                type: 'button',
                value: 'Decrementar',
                onClick: this.props.onDecrementar
            })
        );
    }
};

var app2 = React.createElement(
    'div', null,
    React.createElement(Encabezado, {nombre: 'The warrdnez page'}),
    React.createElement('input', {
        onClick: function(ev) {
            console.log("Este es un evento simple");
        },
        value: 'Guardar'
    }),
    React.createElement(Menu, {
        onClick: function(){
            console.log("mi super evento externo");
        },
        habilitado: true
    })
);

/*ReactDOM.render(
    app2,
    document.getElementById('content')
);*/

/**************************
 * Global params
 * ************************
function render(cuenta){
    ReactDOM.render(
        React.createElement(
            'div', null,
            React.createElement(Encabezado, {nombre: 'The warrdnez page'}),
            React.createElement('input', {
                onClick: function(ev) {
                    console.log("Este es un evento simple");
                },
                value: 'Guardar'
            }),
            React.createElement(Menu, {
                onClick: function(){
                    console.log("mi super evento externo");
                },
                habilitado: true
            }),
            React.createElement(Contenido, null,
                React.createElement('p', null, 'Este es un contenido'),
                React.createElement('br'),
                React.createElement('h2', null, 'este es otro elemento')
            ),
            React.createElement(Contador, {
                cuenta: cuenta,
                onIncrementar: function(){
                    render(cuenta + 1);
                },
                onDecrementar: function(){
                    render(cuenta - 1);
                }
            })
        ),
        domElement
    );
}*/

//render(0);

/**************************
 * Lists
 * ************************/
var itinerario = [
    {id:0, ciudad: 'Popayán', dias: 8},
    {id:1,ciudad: 'Cali', dias: 5},
    {id:2,ciudad: 'Medellín', dias: 6},
    {id:3,ciudad: 'Popayán', dias: 8},
    {id:4,ciudad: 'Bogotá', dias: 10}
];

class CityList extends Component {
    render(){
        return React.createElement('ul', null,
            itinerario.map(function(item){
                return React.createElement('li', {key: item.id},
                    'Ciudad: ' + item.ciudad + ' Dias: ' + item.dias);
            })
        );
    }
};

/*ReactDOM.render(
    React.createElement(CityList),
    domElement
);*/

/**************************
 * States and constructors
 * ************************/
class Toggle extends Component {
    constructor(props){
        super();
        this.state = { activo: true, color:'red' };
    }
    handleClick(ev){
        this.setState({
                activo: !this.state.activo,
                color: this.state.color === 'red' ? 'blue' : 'red'
            },
            function(){
                console.log("El nuevo estado es: " + this.state.activo);
            }
        );
    }
    render(){
        return React.createElement('div', { onMouseOver: this.handleClick.bind(this), style:  {color: this.state.color, backgroundColor: this.state.activo ? 'gray' : 'green'} },
            'Activo: ',
            this.state.activo ? 'Si' : 'No'
        );
    }
}

//ReactDOM.render(React.createElement(Toggle), domElement);

/**************************
 * Ref props
 * ************************/
class Pocs2 extends Component {
    render (){
        return <button ref={ function(el){
            if(el){
                el.focus();
            }
        } }>
            {this.props.texto}
        </button>;
    }
}
/**************************
 * Ciclos de vida
 * ex: MapaGoogle
 * ************************/
class MapaGoogle extends React.Component {
    insertarMapa(el) {

    }
    quitarMapa(el) {

    }
    componentDidMount() {
        this.insertarMapa(this.mapa);
    }
    componentWillUnmount() {
        this.quitarMapa(this.mapa);
    }
    render() {
        return <div ref={function(el) {
            this.mapa = el;
        }.bind(this)} />;
    }
}
/**************************
 * Hooks duante un update
 * ************************/
class Hooks extends React.Component {
    constructor(props) {
        super();
        this.state = {
            actualizando: false,
            temperatura: 0,
            ciudad: 'cali'
        }
    }
    obtenerTemperatura(ciudad){
        if(ciudad === 'cali'){
            return 15;
        }else{
            return 20;
        }
    }
    componentWillMount() {
        this.actualizarTemperatura("popayan");
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.ciudad !== nextProps.ciudad) {
            this.actualizarTemperatura(nextProps.ciudad);
        }
    }
    actualizarTemperatura(ciudad) {
        this.setState({ actualizando: true });
        let temperatura = this.obtenerTemperatura(ciudad);

        if (ciudad === this.props.ciudad) {
            this.setState({actualizando: false, temperatura: temperatura})
        }
    }
    render() {
        if (this.state.actualizando) {
            return React.createElement('div', null,
                React.createElement('span', null, 'actualizando temperatura para ' + this.state.ciudad),
                React.createElement('button', {
                    onClick: function(){
                        this.setState({ciudad: 'cali'});
                        console.log("Actualizar!!");
                    }.bind(this)
                }, 'Actualizar')
            );
        }
        return <span>
            {this.state.temperatura} grados en {this.state.ciudad}
            </span>;
    }
}
/**************************
 * Forms
 * ************************/
class Pocs extends React.Component {
    constructor(props) {
        super();
        this.state = { texto: '', aceptado: false };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            texto: nextProps.texto,
            aceptado: nextProps.aceptado
        });
    }
    handleSubmit(ev) {
        ev.preventDefault();
        this.props.onSubmit({
            texto: this.state.texto,
            aceptado: this.state.aceptado
        });
    }
    handleTexto(ev) {
        this.setState({ texto: ev.target.value });
    }
    handleCheckbox(ev) {
        this.setState({
            aceptado: ev.target.checked
        });
    }
    render() {
        return <form onSubmit={this.handleSubmit.bind(this)}>
            <input
                type="text"
                placeholder="Texto"
                value={this.state.texto}
                onChange={this.handleTexto.bind(this)}
            />
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={this.state.aceptado}
                    onChange={this.handleCheckbox.bind(this)}
                />
                Acepto los terminos
            </label>
            <button type="submit">Guardar</button>
        </form>;
    }
}

export default Pocs;