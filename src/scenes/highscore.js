// import Phaser from 'phaser';

// import WebFontFile from './WebFontFile';


// export default class GameOverScene extends Phaser.Scene {
//     constructor() {
//       super('high-score');
//     }


//  create ()
// {
    

//     var text = this.add.text(10, 10, 'Please entername to save score', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

//     var element = this.add.dom(400, 600).createFromCache('nameform');

//     element.setPerspective(800);

//     element.addListener('click');

//     element.on('click', function (event) {

//         if (event.target.name === 'loginButton')
//         {
//             var inputUsername = this.getChildByName('username');
        

//             //  Have they entered anything?
//             if (inputUsername.value !== '')
//             {
//                 //  Turn off the click events
//                 this.removeListener('click');

//                 //  Tween the login form out
//                 this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

//                 this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
//                     onComplete: function ()
//                     {
//                         element.setVisible(false);
//                     }
//                 });

//                 //  Populate the text with whatever they typed in as the username!
//                 text.setText('Welcome ' + inputUsername.value);
//             }
//             else
//             {
//                 //  Flash the prompt
//                 this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
//             }
//         }

//     });
 
// }
// }
