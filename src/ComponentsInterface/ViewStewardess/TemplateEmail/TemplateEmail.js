import { Email, Item, Span, A, renderEmail } from 'react-html-email';
import React, { Component } from 'react';

/**

 * @version			1.0

 * @author			Erika Gutierrez, Manuel Vasquez

 * @description 	Template for email 

*/

const emailHTML = renderEmail(
	  <Email title="Hello World!">
	    <Item align="center">
	      <Span fontSize={20}>
	        This is an example email made with:
	        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
	      </Span>
	    </Item>
	  </Email>
	)

class TemplateEmail extends Component {
	
	render(){
		return(
			<div>
			 {emailHTML}
			</div>
		)
	}
}
 

export default TemplateEmail;