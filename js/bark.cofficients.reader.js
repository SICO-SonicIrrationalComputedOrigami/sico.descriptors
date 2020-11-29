outlets = 1;
inlets = 2;
var barkCoefficients = new Buffer("barkBandAmp");
var barkScaleCalc = new Buffer("barkScale");
var barkWidthCalc = new Buffer("barkWidth");

function barkScale(windoSize, sampleRate){

	var sr = sampleRate;
	var win = windoSize;
	var f0 = sr/win;
	var barkBand = 0;
	var barkBandPrevious = 0;
	var j = 1;
	var k = 0;
	var barkBandVector = [];

	for(i = 0; i < win; i++){

		barkBand = Math.ceil(((26.81*(i*f0))/(1960 + (i*f0))) - 0.53);
		// barkBandVector[i] = barkBand;
		//post(barkBandVector[i]);
		barkBand = barkBand < 1 ? 1 : barkBand;
		barkBand = barkBand > 25 ? 25 : barkBand;
		barkScaleCalc.poke(0,i,barkBand); //poke -> channel,index,value
	}
	for(i = 1; i <= win; i++){
		if((barkScaleCalc.peek(1,i)) - (barkScaleCalc.peek(1,i-1)) == 0){ 

			j = j+1;
			
		}
		else{ 
			k = k+1;
			barkWidthCalc.poke(0,k,j); //poke -> channel,index,value
			//post("\n",k,j);
			j = 1;

		}

	}

}

function bang(){
	var i = 0;

	for (i = 0; i < 26 ; i++){
	outlet(0, barkCoefficients.peek(1, i));
	}
}
