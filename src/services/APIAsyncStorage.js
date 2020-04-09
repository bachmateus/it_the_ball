import AsyncStorage from "@react-native-community/async-storage";

const APIAsyncStorage = {
	req: (params) => {
		let item = ( params.item ) ? params.item : '';
		const currentDate = new Date();
		
		AsyncStorage.getItem(`${item}`)
			.then( (item) => {
				if ( item != null && item != "" ) {
					return item;
				} else {
					AsyncStorage.setItem(`${item}`, currentDate);
					return currentDate;
				}
			})
			.catch( () => currentDate );
	},

	insert: (key, value) => {
		AsyncStorage.setItem(`${key}`, `${value}`)
	}  
};

export default APIAsyncStorage;