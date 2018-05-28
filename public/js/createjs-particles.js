(function() {

    function ParticleSystem( style )
    {
        this.Container_constructor( );
        this.style = style;
    
        this.setup();
    }

    var p = createjs.extend( ParticleSystem, createjs.Container );

        p.setup = function()
        {
            this.particles = [];
            this.modifiers = [];
        }

        p.start = function()
        {
            this.updateListener = this.on("tick", this.update );
        }

        p.stop = function()
        {
            this.off("tick", this.updateListener);
        }

        p.addModifier = function( ...modifiers )
        {
            this.modifiers.push( ...modifiers );
        }

        p.spawnParticle = function( data )
        {
            var particle = new createjs.Particle( data );
            this.addChild( particle );
            this.particles.push( particle );
            return particle;
        }

        p.spawn = function( count )
        {
            count.downto(0, () => this.spawnParticle( this.func( this.style ) ) );
        }
        
        p.func = function( f )
        {
          return typeof f === "function" ? f() : f;
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


    createjs.ParticleSystem = createjs.promote( ParticleSystem, "Container" );
} () );


(function() {

    function Particle( data )
    {
        var defaults = {
            lifetime: 1,
            velocity: new createjs.Point(0,0),
            angularVelocity: 0,
            drawing: (graphics) => graphics.beginFill("#F00").drawCircle(0,0,8).endFill(),
            caching: null
        };

        Object.merge(this, defaults);
        Object.merge(this, data);

        this.energy = this.lifetime;

        this.Shape_constructor( );
        this.setup();
    }

    var p = createjs.extend( Particle, createjs.Shape );

        p.setup = function()
        {
            this.drawing( this.graphics );

            if( this.caching )
                this.cache( ...this.caching );
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


    createjs.Particle = createjs.promote( Particle, "Shape" );
} () );




var ParticleModifiers = {
    sizeOverLifetime: function( start, finish, ease )
    {
        return function(particle){
            var t = ease( particle.getT() );
            particle.scaleX = particle.scaleY = createjs.Math.lerp(start, finish, t);
        }
    },

    alphaOverLifetime: function( start, finish, ease )
    {
        return function(particle){
            var t = ease( particle.getT() );
            particle.alpha = createjs.Math.lerp(start, finish, t);
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
