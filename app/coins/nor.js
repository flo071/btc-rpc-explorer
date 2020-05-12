var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"NOR",
		multiplier:1,
		default:true,
		values:["", "nor", "NOR"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mNOR",
		multiplier:1000,
		values:["mNOR"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"µNOR",
		multiplier:1000000,
		values:["µNOR"],
		decimalPlaces:2
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
];

module.exports = {
	name:"Noir",
	ticker:"NOR",
	logoUrl:"/img/logo/nor.svg",
	siteTitle:"Noir Explorer",
	nodeTitle:"Noir Full Node",
	nodeUrl:"https://noirofficial.org/",
	demoSiteUrl: "https://exploreer.noirofficial.orrg/",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 150,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"NOR":currencyUnits[0], "mNOR":currencyUnits[1], "µNOR":currencyUnits[2]},
	baseCurrencyUnit:currencyUnits[0],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHashesByNetwork:{
		"main":    "6283b7fafca969a803f6f539f5e8fb1a4f8a28fc1ec2106ad35b39354a4647e5",
		"test":    "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
		"regtest": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "04ff9bc3453a83687a95daf2342eceedac19dd73e356569704533aae02e9d6a9",
		"test":    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"regtest": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
	},
	genesisCoinbaseTransactionsByNetwork: {},
	genesisBlockHash: "6283b7fafca969a803f6f539f5e8fb1a4f8a28fc1ec2106ad35b39354a4647e5",
	genesisCoinbaseTransactionId: "04ff9bc3453a83687a95daf2342eceedac19dd73e356569704533aae02e9d6a9",
	genesisCoinbaseTransaction: {},
	historicalData: [],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/noir/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {

	if (blockHeight == 0)
    		return 0;

	if (blockHeight < 105000)
		return 100;

        if (blockHeight < 210000)
                return 50;

        if (blockHeight < 230250)
                return 12.5;

	if (blockHeight < 255250)
		return 50;

	if (blockHeight < 420000)
		return 12.5;

	if (blockHeight <= 435005)
		return 6.25;


        /*
         *  New reward structure
         *  No cap
         *  2.2 Noir/block
         *  20% dev reward/block
         *  Community voted for this on 03/02/2019
         */
        if((blockHeight > 435005) && !((blockHeight >= 480000) && (blockHeight <= 480005)))
        {
            return 2.2;
        } else if((blockHeight >= 480000) && (blockHeight <= 480005))
        {
            return 600000; //600k Noir Dev fund 
        }

	}
};
