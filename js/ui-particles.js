(function() {

    function UIParticleSystem( )
    {
        this.Container_constructor( );
        this.setup();
    }

    var p = createjs.extend( UIParticleSystem, createjs.Container );

        p.setup = function()
        {
            this.particles = [];
            this.modifiers = [];

            this.modifiers.push( ParticleModifiers.sizeOverLifetime(1.5, 0, createjs.Ease.circOut) );
            this.modifiers.push( ParticleModifiers.turbulence(10) );
            this.modifiers.push( ParticleModifiers.damping(.1) );
            this.modifiers.push( ParticleModifiers.drift( new Point(0, -1), 200 ) );
            //this.modifiers.push( this.alphaOverLifetime(1, 0, createjs.Ease.linear) );
        }

        p.start = function()
        {
            this.updateListener = this.on("tick", this.update );
        }

        p.stop = function()
        {
            this.off("tick", this.updateListener);
        }

        p.spawnParticle = function( data )
        {
            var particle = new UIParticle( data );
            this.addChild( particle );
            this.particles.push( particle );
            return particle;
        }

        p.spawn = function( count )
        {
            var shadow = new createjs.Shadow("#EEE", -2, 2, 0);
            count.downto(0, function(){
                var p = this.spawnParticle({
                    lifetime: Math.random() * 1 + 1,
                    velocity: Point.polar(1, Math.random() * 2 * Math.PI).scale( Math.random() * 200 + 200 ),
                    drawing: function( graphics )
                    {
                        graphics.beginFill("#FFF").drawCircle(0,0,10).endFill();
                    //    graphics.setStrokeStyle(2).beginStroke("#EEE").arc(0,0,10,Math.PI/2, Math.PI).endStroke();
                    }
                })
                p.shadow = shadow;
            }.bind(this));
        }

        p.update = function( event )
        {
            if( !this.timeStamp )
            {
                this.timeStamp = event.timeStamp;
                return;
            }


            this.deltaTime = (event.timeStamp - this.timeStamp) / 1000;
            this.timeStamp = event.timeStamp;

            for( var i = this.particles.length - 1; i >= 0; i-- )
            {
                var particle = this.particles[i];

                this.modifiers.forEach( function(modifier){
                    modifier(particle, this.deltaTime);
                }.bind(this));

                particle.update( this.deltaTime );

                if( particle.isDead() )
                {
                    this.particles.splice(i,1);
                    this.removeChild( particle );
                }
            }

            if( this.particles.length == 0 && this.autoDestroy )
            {
                this.stop();
                if( this.parent )
                    this.parent.removeChild( this );
            }
        }


    window.UIParticleSystem = createjs.promote( UIParticleSystem, "Container" );
} () );


(function() {

    function UIParticle( data )
    {
        var defaults = {
            lifetime: 1,
            velocity: new Point(0,0),
            angularVelocity: 0,
            drawing: function(graphics)
            {
                graphics.beginFill("#F00").drawCircle(0,0,8).endFill();
            }
        };

        Object.merge(this, defaults);
        Object.merge(this, data);

        this.energy = this.lifetime;

        this.Shape_constructor( );
        this.setup();
    }

    var p = createjs.extend( UIParticle, createjs.Shape );

        p.setup = function()
        {
            this.drawing( this.graphics );
        }

        p.update = function( deltaTime )
        {
            this.x += this.velocity.x * deltaTime;
            this.y += this.velocity.y * deltaTime;
            this.rotation += this.angularVelocity * deltaTime;

            this.energy -= deltaTime;
        }

        p.isDead = function()
        {
            return this.energy <= 0;
        }


        p.getT = function()
        {
            return 1 - (this.energy / this.lifetime);
        }


    window.UIParticle = createjs.promote( UIParticle, "Shape" );
} () );




var ParticleModifiers = {
    sizeOverLifetime: function( start, finish, ease )
    {
        return function(particle){
            var t = ease( particle.getT() );
            particle.scaleX = particle.scaleY = lerp(start, finish, t);
        }
    },

    alphaOverLifetime: function( start, finish, ease )
    {
        return function(particle){
            var t = ease( particle.getT() );
            particle.alpha = lerp(start, finish, t);
        }
    },

    turbulence: function(amount)
    {
        return function(particle)
        {
            var xT = 2 * Math.random() * amount - amount;
            var yT = 2 * Math.random() * amount - amount;
            particle.velocity.x += xT;
            particle.velocity.y += yT;
        }
    },

    damping: function(amount)
    {
        return function(particle)
        {
            particle.velocity = particle.velocity.scale( 1 - amount );
        }
    },

    drift: function( direction, amount )
    {
        return function(particle, deltaTime)
        {
            //console.log( direction )
            particle.velocity =  particle.velocity.add( direction.scale(amount * deltaTime) );// * deltaTime);
        }
    },
}
