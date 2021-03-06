import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
declare var $:any
@Component({
  selector: 'app-previsualise',
  templateUrl: './previsualise.component.html',
  styleUrls: ['./previsualise.component.css']
})
export class PrevisualiseComponent implements OnInit,OnDestroy {

  constructor(private service: DataTransferService) { }
  ProjectTitle= "projet1"
  collectorFromModification = []


  ngOnInit(): void {

    this.service.currentMessage.subscribe(message => this.collectorFromModification = message)
    console.log(this.collectorFromModification)
    var startingFrame =0
    var pointOfInterest = {}
    var numberOfPoints = 0;
    var collector = {}
    var Integrate=false
    var showP = true
    var seen = false
    var i = 1
    //models sources
    var ImgBank1 = {}

    ImgBank1[0] = {
      "source":"http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n1-##.jpg|01..118",
      "annotations":{},
      "numberOfPuces": 0
    }
    ImgBank1[1] = {
      "source":"http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n2-##.jpg|01..118",
      "annotations":{},
      "numberOfPuces": 0
    }
    ImgBank1[2] = {
      "source":"http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n3-##.jpg|01..118",
      "annotations":{},
      "numberOfPuces": 0
    }
    ImgBank1[3] = {
      "source":"http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n4-##.jpg|01..118",
      "annotations":{},
      "numberOfPuces": 0
    }
    ImgBank1[4] = {
      "source":"http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n5-##.jpg|01..118",
      "annotations":{},
      "numberOfPuces": 0
    }

    var ImgBank2 = {}
    ImgBank2[0] = {
      "source":"assets/BELZ_FACADES_HTML/images/lv1/img##.jpg",
      "annotations":{},
      "numberOfPuces": 0
    }

    //versions
    var versionBank = []
    versionBank[0]= {
      "MqNumber": 5,
      "MqBank": ImgBank1
    }
    versionBank[1]= {
      "MqNumber": 1,
      "MqBank": ImgBank2
    }
    var currentMq = versionBank[0].MqBank[0].source

    //visualise puces function
    var showPuces = (collector,startingFrame)=>{
      $("#my_picture2").reel({
                  images: currentMq,
                  frames: 104,
                  frame: startingFrame,

                      annotations: collector
                  }
          )
    }
    var pointannotation = (myPoint,startingFramer,posx,posy,pointNumber)=>{
      posx =posx/1200*100
      posy =posy/614*100
      pointOfInterest[myPoint] = {
          node: {html: "<button style='cursor: pointer;border: none;outline: none;background: none;' data-modal-target='#modal"+pointNumber+"' style='cursor: pointer'><img width='25px' height='25px' src='./assets/1200px-Target_Corporation_logo_(vector).svg.png' /></button>", css:{width:100}},

          start: startingFramer-1,
          end: startingFramer+1,
          x: posx+"%",
          y: posy+"%"
      }
      return pointOfInterest[myPoint]
  }
    //get current frame function
    $("#my_picture2").trigger("play").bind('frameChange', function(e, depr_frame, frame){

      startingFrame = frame;
      //$(this).reel("frame",frame) ;
      //console.log(frame)
      //console.log(typeof(frame))
      //console.log(depr_frame)
    })

    //the versions/models function


    //Basic animation
    $("#my_picture2").reel({
      images: currentMq,
      frames: 104,
      frame: 1
      }
    )

    var ModalCollector = {}
    var currentVer
    currentVer = versionBank[0]
    var currentNumberOfMq
    var numberOfMq = versionBank[0].MqNumber
    currentNumberOfMq = numberOfMq
    var currentMqNumber = 0

    $(document).on("click","#VerButton0",()=>{console.log("hi")})
    $(document).ready(()=>{
      console.log("something is here")
      for (let indexV = 0; indexV < versionBank.length; indexV++) {
        $(".flex-horizontal-button-container").append("<div style='z-index: 20;margin: 10px;text-align: center;line-height: 50px;font-size: 50px;border: 1px;'><button id='VerButton"+indexV+"' style='padding: 10px 16px;'>v"+indexV+"</button></div>")

        $(document).on("click","#VerButton"+indexV,()=>{
          console.log("hi")

          currentVer = versionBank[indexV]

          currentMq = currentVer.MqBank[0].source
          console.log(currentVer)
          showPuces(currentVer.MqBank[0].annotations,1)
          $(".flex-vertical-button-container").empty()
          $("#points-list").empty()
          $("#hidden-modals").empty()
          numberOfPoints = 0
          for (let indexM = 0; indexM < currentNumberOfMq; indexM++) {
            currentNumberOfMq = currentVer.MqNumber

            $(".flex-vertical-button-container").append("<div><button id='mqButton"+indexM+"' style='padding: 10px 16px;margin: 5px;'>Mq-"+indexM+"</button></div>")
            document.getElementById("mqButton"+indexM).addEventListener("click",()=>{
              //console.log("this model contains these annotations :",currentVer.MqBank[indexM].annotations)
              console.log("hi from model number"+indexM)
              console.log("number of points is ",currentVer.MqBank[indexM].numberOfPuces)

              //numberOfPoints = 0



                $("#points-list").empty()
                $("#hidden-modals").empty()
                currentVer.MqBank[currentMqNumber].annotations = collector
                currentVer.MqBank[currentMqNumber].numberOfPuces = numberOfPoints
                console.log("there is",currentMqNumber)
                currentMq = currentVer.MqBank[indexM].source

                currentMqNumber = indexM
                console.log("there is",currentMqNumber)
                console.log("before moving, collector in model number ",indexM," is :",collector)
                console.log("before moving, currentVer.MqBank[indexM].annotations in model number "+indexM+" is :",currentVer.MqBank[indexM].annotations)
                collector = currentVer.MqBank[indexM].annotations
                console.log("number of puces from indexM is ",currentVer.MqBank[indexM].numberOfPuces)
                console.log("number of puces from currentMqNumber is ",currentVer.MqBank[currentMqNumber].numberOfPuces)
                numberOfPoints = currentVer.MqBank[indexM].numberOfPuces
                console.log("after moving, collector in model number "+indexM+" is :",collector)
                console.log("after moving, currentVer.MqBank[indexM].annotations in model number "+indexM+" is :",currentVer.MqBank[indexM].annotations)
                //currentVer.MqBank[indexM].annotations = collector

                showPuces(currentVer.MqBank[indexM].annotations,1)

            })
        }
      })

    }})
  }
  @HostListener('unloaded')
  ngOnDestroy() {

    console.log('Items destroyed');
    $(document).off("click")

  }
}
