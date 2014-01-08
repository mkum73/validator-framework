var p=0;
var TEST= {};
TEST.validate = {
settings:{
	form: null,
	texts: null,
	selects: null,
	radios:null ,
	checkboxes: null

},
initialisedValues:{
	form: null,
	text: '',		//Initial value of text inputs.....
	SELECT: 'select',//Initial value of select or default/selected value...
	radio:false,
	checkbox:false

},
errmsg:{			//not in use right now...
	text:"please fill out the field",
	radio:"please select any radios",
	select:"please select any option",
	checkbox:"please select the checkboxes"

},
init: function(form){
	var local = this.settings;
	local.form = $(form);
	local.radios = this.settings.form.find('input:radio');
	local.checkboxes = this.settings.form.find('input:checkbox');
	local.texts = this.settings.form.find('input:text');
	local.selects = this.settings.form.find('select');
	this.setEvents();

},
setEvents:function(){	
	var that = this;
	
	$( this.settings.texts).on('blur', function(){	
		that.validateFormFields(this);
	});
	this.submitForm();
},
validateFormFields :function(elem){	
	var type = this.getElementType(elem);
	var element=this.getElementTagName(elem);
	var value=$(elem).val();
	if(value===this.initialisedValues[type])
		{
			this.showErrorMessage(elem);
			p++;
			return p;
		}
	else{ 
			this.removeErrorMessage(elem);
			p=0;
			return	p;
		}
},
getElementType: function(elem){
	var type_name;
	var type=this.getElementTagName(elem);
//	console.log(type);
	if (type==='INPUT'){
		type_name = $(elem).attr('type');

		}
	else  {type_name = type;}
//	console.log(type_name);
	return type_name;
	
	},
getElementTagName: function(elem){
	var type = $(elem).prop('tagName');
	return type === 'input' ? $(elem).prop('tagName') : type;
},
showErrorMessage:function(elem){
 	var type_name = this.getElementType(elem);
		var input=this.getClassName(elem);
		if (type_name==="text"){
			var labelForField="#"+input+" label";
			} 
		else
 		{
 		labelForField="#"+input+" p";
 		}
		$(labelForField).addClass('error');
	},

	removeErrorMessage:function(elem){
	var type_name = this.getElementType(elem);
		var input=this.getClassName(elem);
		if (type_name==="text"){
			var labelForField="#"+input+" label";
			} else
 		 	{
 				labelForField="#"+input+" p";
 			}
			$(labelForField).removeClass('error');
	},
getClassName:function(elem){
var string='#'+$(elem).attr('id');
var input=$(string).parent().attr('id');
return input;
},
submitForm : function(){
	var that=this;
	var result;
	
	$(this.settings.form).submit(function(){
		result=that.eventTrigger();
		if(result===false){
			alert('please fill the required fields');
			return false;
			}
		});
},
	eventTrigger : function(){
		var Groups = [];
		var elements = [];
		var isChecked;
		var p=0;
		var size;
		var AllElements=[this.settings.texts,this.settings.radios,this.settings.checkboxes,this.settings.selects];
		for(s in AllElements)
			{
				var elem=AllElements[s];
				if(elem.length>0)
					{
						var type_name=this.getElementType(elem);
						if(	type_name==='radio' || type_name==='checkbox')
							{
								for(i=0;i<elem.length;i++)
									{
										elements.push($(elem)[i].getAttribute("name"));
									}
								Groups=$.unique(elements);//it sorts the array :(
								size = Groups.length;
								for(k=0;k<size;k++)
				 					{
								 		isChecked =  false;
								 		var temp = document.getElementsByName(Groups[k]);
										for(i=0;i<temp.length;i++)
											{
												var id=temp[i].parentNode.getAttribute('id');
												if(temp[i].checked==true)
													{	
														isChecked=true;	
														break;
													}
											}
												var Container="#"+id+" p";
										if(!isChecked)
											{
												p=p+1;	
												$(Container).addClass('error');

											}
										else 
											{
												$(Container).removeClass('error');
											}
									}
							}
						else
							{
								for(i=0;i<elem.length;i++)
								{
								var element=$(elem).eq(i);
								var value=element.val();
								var result=	this.validateFormFields(element);	
								}
							}
	
					}
			}				if(p!= 0 || result!=0 ) return false;
}
};