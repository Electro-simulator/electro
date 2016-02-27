var InputLabel_1 = {    
    connectionName : 'Input_1',
    connectionType :'Stream'
};


var InputLabel_2 = {
    connectionName : 'Input_2',
    connectionType :'Stream'
};

var InputLabel_3 = {
    connectionName : 'Input_3',
    connectionType :'Stream'
};

var InputLabel_4 = {
    connectionName : 'Input_4',
    connectionType :'Stream'
};

var OutputLabel = {
    connectionName : 'Output',
    connectionType :'Stream'
};

var Streams = [InputLabel_1,InputLabel_2,InputLabel_3,InputLabel_4,OutputLabel];
// get array of the labels list. 

/* 
	To add new label, we need to define labels as follows
	
	var <LABEL_NAME> = {
		connectionName : '<LABEL_NAME>', - No white space need to add between two words. for space developer can use "_". 
		connectionType : '<TYAPE_OF_THE_LABEL>' - Mostly this may be "Steam".  
	};
	
	*/
