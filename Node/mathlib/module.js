module.exports = function(){
        return {
            add: function(a,b){
                result = a+b;
                console.log(result);
            },
            multiply: function(a,b){
                result = a*b;
                console.log(result);
            },
            square: function(a){
                result = a*a;
                console.log(result);

            },
            random: function(a,b){
                result = Math.floor(Math.random()*(b-a)+a);
                console.log(result);
            }
        }
    };
