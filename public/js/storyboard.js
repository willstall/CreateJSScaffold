/*

    - Each board will also gain a storyboard variable to their owner.
    - Each board added to storyboard will recieve the following messages on board change:
        onBoardAdded( evt => board, storyboard )
        onBoardTeardown( evt => board, storyboard )
        onBoardSetup( evt => board, storyboard )
        onBoardRemoved( evt => board, storyboard )

    - Each board added to the storyboard could recieve the following message if current:
        onPause
        onResume

    EXAMPLE CODE:
        // Boards
        var board1 = new demoStoryboard();
        var board2 = new demoStoryboard();
        var board3 = new demoStoryboard();
        var board4 = new demoStoryboard();
        var board5 = new demoStoryboard();

        // Storyboard
        storyboard = new Storyboard();
        storyboard.add( Storyboards.MAIN , board1 );
        storyboard.add( Storyboards.MAIN , board2 );
        storyboard.add( Storyboards.MAIN , board3 );
        storyboard.add( Storyboards.OPTIONS , board4 );
        storyboard.add( Storyboards.PRELOAD , board5 );
        storyboard.init( Storyboards.MAIN );
        storyboard.remove( Storyboards.MAIN );
        storyboard.change(Storyboards.OPTIONS);
        storyboard.pause();
        storyboard.resume();
*/

function Storyboard()
{
    this.debug = false;     // set this to true in order to see console.log on events not executed

    this.initialBoard = null;
    this.last = null;
    this.next = null;

    this.isPaused = false;

    this.boards = {};

    this.events =
    {
        ADDED:      "onBoardAdded",
        REMOVED:    "onBoardRemoved",
        TEARDOWN:   "onBoardTeardown",
        SETUP:      "onBoardSetup",
        PAUSE:      "onBoardPause",
        RESUME:     "onBoardResume"
    };

    this.pauser = new Rx.Subject();
    this.source = new Rx.Subject();
    this.buffer = new Rx.Subject();

    this.boardStream = new Rx.Subject();
    this.boardStream.subscribe( this.source );

    this.source
        .buffer( this.pauser )
        .mergeAll()
        .subscribe( this.buffer );

    var stream = this.pauser.startWith(false).switchMap( paused => paused ? this.buffer : this.source )

    stream.subscribe( ( [ board, event, ...data] ) => board.next( [event, ...data] ) );

}

Storyboard.prototype.pauseChanges = function()
{
    this.pauser.next(true);
}

Storyboard.prototype.resumeChanges = function()
{
    this.pauser.next(false);
}


Storyboard.prototype.init = function( board )
{
    this.initialBoard = board;
    this.change( board );
}

/*
    Board object will gain a storyboard variable.
*/
Storyboard.prototype.parseStream = function( ev, ...data )
{
    try
    {
        this[ev]( ...data );
    } catch( e ) {
        // console.error(e);
    }
}

Storyboard.prototype.add = function( board, subscriber )
{
    // Get board
    var b = this.getBoard( board );

    subscriber.storyboard = this;

    subscriber._sbparse = this.parseStream.bind( subscriber );
    subscriber._sbsubscription = b.subscribe( (params) => subscriber._sbparse( ...params ) );

    b.next( [this.events.ADDED, subscriber] );
}

Storyboard.prototype.remove = function( board, subscriber )
{

    var b = this.getBoard( board );

    b.next( [this.events.REMOVED, subscriber] );

    subscriber._sbsubscription.unsubscribe();

    delete subscribe._sbsubscription;
    delete subscribe._sbparse;
    delete subscribe.storyboard;
}

/*
    Use this method to change your current board.
*/
Storyboard.prototype.change = function( board, data = null )
{
    // Check to see if we're already on this board
    if( this.isCurrent( board ))
        //console.log('c');
        return false;

    // Check to make sure the board has been added
    if(!this.getBoard(board))
        return false;

    var next = this.getBoard( board );
    var last = this.getBoard( this.last );

    // this.next = board;
    //
    this.boardStream.next( [last, this.events.TEARDOWN, board ] );
    this.boardStream.next( [next, this.events.SETUP, this.last, data ] );

    this.last = board;

    return true;
}

Storyboard.prototype.isCurrent = function( board )
{
    return this.last == board;
}

Storyboard.prototype.getBoard = function( board )
{
    var b = this.boards[board];
    if( !b )
    {
        b = new Rx.Subject();
        this.boards[board] = b;
    }

    return b;
}

/*

    PLEASE NOTE:
        This is just an example different storyboards you might need in a project.
        Please make your own storyboards for each project as necessary.

*/
var Storyboards =
{
   PRELOAD:     "Preload",
   MAIN:        "Main",
   TUTORIAL:    "Tutorial",
   PAUSE:       "Pause",
   OPTIONS:     "Options",
   GAME:        "Game",
   LEVEL:       "Level",
   SCOREBOARD:  "Scoreboard",
   CREDITS:     "Credits"
}

/*

    This is a demo board just to use for quick examples.
*/
function demoStoryboard()
{
    this.onBoardAdded = e => console.log(e);
    this.onBoardTeardown = e => console.log(e);
    this.onBoardSetup = e => console.log(e);        // setup events can recieve an optional data event
    this.onBoardRemoved = e => console.log(e);
    this.onBoardPause = e => console.log(e);
    this.onBoardResume = e => console.log(e);
};