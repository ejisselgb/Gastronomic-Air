import React, { Component } from 'react';
import Modal from 'react-modal';

import './ViewStewardess.css';
import ViewModal from '../ViewModal/ViewModal'

Modal.setAppElement('body')

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Contain the avalaible options for the uer of type stewardess

*/

class ViewStewardess extends Component {

	/** @constructor */

	constructor(props, context) {

		super(props);
		this.state = {
					disabledFood: false,  
					disabledRegistry: false,
					disabledProvider: false,
					disabledPoll: false,
					disabledLoad: false
				};

		this.getValueButtons = this.getValueButtons.bind(this);
	}

	componentDidMount(){
		this.setState({

			messageModal: '¿Listo para volar?, ingresa los datos de tu vuelo',
			valueNameInput: 'numberfligth',
			valueBtn: 'Buscar este vuelo',
			messageInfo: 'Código del vuelo',

			messageModalPass: 'Ingresa los datos del pasajero para continuar',
			valueNameInputPass: 'numberres',
			valueBtnPass: 'Registrar Pasajero',
			messageInfoPass: 'Nro Reserva',

			messageModalPro: 'Genere y solicite los reportes por cada vuelo',
			valueNameInputPro: 'reportPro',
			valueBtnPro: 'Generar Reporte',
			messageInfoPro: 'Ingresa los datos del vuelo para continuar',

			messageModalPoll: 'Conozca que piensan los usuarios de las comidas especiales',
			valueNameInputPoll: 'inquiry',
			valueBtnPoll: 'Enviar Encuesta',

			messageModalLoad: 'Cargue la comida especial a llevar en este vuelo',
			valueNameInputLoad: 'loadFood',
			valueBtnLoad: 'Ir Cargue comida',
		})
	}

	render(){

		return(
			<div>
				<div className="container-fluid">
					<div className="container-pass vie-ste">
					<h1 className="title-home-app">Bienvenido a tu perfil de tripulante</h1>
					<center><h5>Selecciona una opción</h5></center>
					<form>
						<div className="row container-buttons-home button-pass">
							<div className=" col-sm-10 ">
								<div className="container-row-buttons">
									<div className="col-sm-2 button-menu">
										<button type="button" className="buttons-home button-passenger" id="seeFood" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Ver comidas</p></button>
									</div>
    								<div className="col-sm-2 button-menu">
    									<button type="button" className="buttons-home button-passenger" id="registry" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Registrar Pasajero</p></button>
    								</div>
    								<div className="col-sm-2 button-menu">
    									<button type="button" className="buttons-home button-passenger" id="generate" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Generar Reporte</p></button>
    								</div>
    								<div className="col-sm-2 button-menu">
    									<button type="button" className="buttons-home button-passenger" id="send" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Enviar Encuesta</p></button>
    								</div>
    								<div className="col-sm-2 button-menu">
    									<button type="button" className="buttons-home button-passenger" id="loadFood" onClick={this.getValueButtons.bind(this)}><p className="title-buttons-home">Cargar comida</p></button>
    								</div>
    							</div>
    						</div>
						</div>
					</form>
					<div>
						{ this.state.disabledFood ? <ViewModal disabled={this.state.disabledFood} history={this.props.history} messageModal={this.state.messageModal} valueNameInput={this.state.valueNameInput} valueBtn={this.state.valueBtn} messageInfo={this.state.messageInfo}/> : null }
					</div>
					<div>
						{ this.state.disabledRegistry ? <ViewModal disabled={this.state.disabledRegistry} history={this.props.history} messageModal={this.state.messageModalPass} valueNameInput={this.state.valueNameInputPass} valueBtn={this.state.valueBtnPass} messageInfo={this.state.messageInfoPass}/>  : null }
					</div>
					<div>
						{ this.state.disabledProvider ? <ViewModal disabled={this.state.disabledProvider} history={this.props.history} messageModal={this.state.messageModalPro} valueNameInput={this.state.valueNameInputPro} valueBtn={this.state.valueBtnPro} messageInfo={this.state.messageInfoPro}/>  : null }
					</div>
					<div>
						{ this.state.disabledPoll ? <ViewModal disabled={this.state.disabledPoll} history={this.props.history} messageModal={this.state.messageModalPoll} valueNameInput={this.state.valueNameInputPoll} valueBtn={this.state.valueBtnPoll} messageInfo={this.state.messageInfo}/>  : null }
					</div>
					<div>
						{ this.state.disabledLoad ? <ViewModal disabled={this.state.disabledLoad} history={this.props.history} messageModal={this.state.messageModalLoad} valueNameInput={this.state.valueNameInputLoad} valueBtn={this.state.valueBtnLoad} messageInfo={this.state.messageInfo}/>  : null }
					</div>

				</div>
				</div>
			</div>
		)
	}

	/**

	 * Pass between components and send email depending on value id of button

	 * @param  {e} capture the value of button object

	*/

	getValueButtons(e){

		if(e.target.id === "seeFood"){
			this.setState( {disabledFood: true, disabledRegistry: false, disabledProvider: false, disabledPoll: false, disabledLoad:false} )
		}

		else if(e.target.id === "registry"){
			this.setState( {disabledRegistry: true, disabledFood: false, disabledProvider: false, disabledPoll: false, disabledLoad:false} )
			
		}

		else if(e.target.id === "generate"){
			this.setState( {disabledProvider: true, disabledFood: false, disabledRegistry:false, disabledPoll: false, disabledLoad:false} )
		}

		else if(e.target.id === "send"){
			this.setState( {disabledPoll: true, disabledFood: false, disabledRegistry:false, disabledProvider: false, disabledLoad:false} )
			
		}

		else if(e.target.id === "loadFood"){
			this.setState( {disabledPoll: false, disabledFood: false, disabledRegistry:false, disabledProvider: false, disabledLoad: true} )
			
		}
	}

}

export default ViewStewardess;