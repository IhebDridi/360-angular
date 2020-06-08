import { Component, OnInit, HostListener, OnDestroy, Injectable   } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTransferService } from "src/app/services/data-transfer.service"
import { BehaviorSubject } from 'rxjs';


declare var $:any

@Component({
  selector: 'app-model-m',
  templateUrl: './model-m.component.html',
  styleUrls: ['./model-m.component.css']
})
@Injectable()

export class ModelMComponent implements OnInit,OnDestroy {

  newMessage(something) {
    this.service.changeMessage(something)
    console.log(something)
  }

  constructor( private modalService: NgbModal,private service: DataTransferService) {
  }

  onDataGet()
  {
    var item = {ProjectName: "Project2"}
    this.service.onGetProjects(item)
  }
  ProjectTitle= "projet1"
  VersionBankGeneral = []
  ngOnInit(): void {

    this.onDataGet()
    var startingFrame =0
    var pointOfInterest = {}
    var numberOfPoints = 0;
    var collector = {}
    var Integrate=false
    var showP = true
    var seen = false
    var i = 1
    $("#show-puces").click((e)=>{
      i++;
      $("#Integration-puce").attr('disabled', showP);
      if(i%2==0) {
          $("#show-puces-button").html("+")
          showNoPuces()
          seen = false
      }
      else{
      modalManager()
          showPuces(collector,startingFrame)
          $("#show-puces-button").html("-")
      }
      showP =!showP
      console.log(showP)

    })
    //img test
    let readURLImg = (input,number) => {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          console.log(input.files)

          reader.onload = function (e) {
            console.log($("#originalPuceImage"+number).attr('src'))
              $("#originalPuceImage"+number)
                  .attr('src', e.target.result);
              console.log($("#originalPuceImage"+number).attr('src'))
              $("#changePuceImage"+number)
                  .attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
      }
  }

    function openModal(modal){
      if(modal==null) return
      console.log("opening modal")
      modal.classList.add("active")
      $(".modal").resizable()
      $(".modal").draggable()
      $(".originalPic").resizable()
      $(".ChangePic").resizable()
    }
    function closeModal(modal){
      if(modal==null) return
      modal.classList.remove("active")
    }
    $("#Integration-puce").click((e)=>{
      Integrate=!Integrate
      console.log(Integrate)
    })
    var showNoPuces = ()=>{
      $("#my_picture").reel({
                  images: currentMq,
                  frames: 104,

                  frame: 1
      }
          )
    }
    function changeM (){
      console.log("hi")
    }
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
    var versionBank = this.VersionBankGeneral
    versionBank[0]= {
      "MqNumber": 5,
      "MqBank": ImgBank1
    }
    versionBank[1]= {
      "MqNumber": 1,
      "MqBank": ImgBank2
    }



    var currentMq = versionBank[0].MqBank[0].source

    var showPuces = (collector,startingFrame)=>{
      $("#my_picture").reel({
                  images: currentMq,
                  frames: 104,
                  frame: startingFrame,

                      annotations: collector
                  }
          )
    }
    var modalManager = ()=>{
      const openModalButton = document.querySelectorAll('[data-modal-target]')
          //console.log(openModalButton)
          const closeModalButton = document.querySelectorAll('[data-modal-close]')
          openModalButton.forEach(button =>{
              button.addEventListener("click",(e)=>{

                  const modal = document.querySelector(button.getAttribute("data-modal-target"))
                  console.log("open Modal",modal)
                  openModal(modal)
              })
          })
          closeModalButton.forEach(button =>{
              button.addEventListener("click",()=>{
                  const modal = button.closest('.modal')
                  closeModal(modal)
              })
          })
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
    $("#my_picture").trigger("play").bind('frameChange', function(e, depr_frame, frame){

      startingFrame = frame;
      //$(this).reel("frame",frame) ;
      //console.log(frame)
      //console.log(typeof(frame))
      //console.log(depr_frame)
    })

    //Basic animation
    $("#my_picture").reel({
      images: currentMq,
      frames: 104,
      frame: 1
      }


    )

    //integration d'etit puce = half done
    //integration de previsualisation = not done
    //sauvegarde des puces = done
    //importation des puce d'un version a une autre (meme maquete) = not done
    //integration d'une maquette 2 = not done




      var ModalCollector = {}
      var currentVer
      currentVer = versionBank[0]
      var currentNumberOfMq
      var numberOfMq = versionBank[0].MqNumber
      currentNumberOfMq = numberOfMq
      var currentMqNumber = 0
      /*document.getElementById("saving-button").addEventListener("click",()=>{
        console.log(collector,currentMqNumber)

        console.log("saved")

        console.log(currentVer.MqBank[currentMqNumber])

      })*/

      //the creator
      /*var creator = (indexV)=>{
        var v = confirm("if you switch models without saving, you will lose all unsaved points")
        if(v ==true)
        {
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

            var r = confirm("if you switch models without saving, you will lose all unsaved points")
            if(r ==true)
            {
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
            }
            else
            {
            }
          })
      }}
      else{}
    }*/
    if($( ".modal active" ).length )
    {

      console.log("a modal exist")
    }

      $(document).ready(()=>{


        for (let indexV = 0; indexV < versionBank.length; indexV++) {
          $(".flex-horizontal-button-container").append("<div style='z-index: 20;margin: 10px;text-align: center;line-height: 50px;font-size: 50px;border: 1px;'><button id='VerButton"+indexV+"' style='padding: 10px 16px;'>v"+indexV+"</button></div>")

          $(document).on("click","#VerButton"+indexV,()=>{
            console.log("hello ")

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
                  versionBank[indexV] = currentVer
                  this.VersionBankGeneral = versionBank[indexV]
                  versionBank[indexV] = this.VersionBankGeneral
                  console.log(currentVer.MqBank[indexM].annotations)
                  console.log(this.VersionBankGeneral)

                  console.log("number of puces from indexM is ",currentVer.MqBank[indexM].numberOfPuces)
                  console.log("number of puces from currentMqNumber is ",currentVer.MqBank[currentMqNumber].numberOfPuces)
                  numberOfPoints = currentVer.MqBank[indexM].numberOfPuces
                  if(numberOfPoints != 0){
                    $("#hidden-modals").append("<div class='modal' id='modal"+numberOfPoints+"'><div class='modal-header' id='modalHeader'><div class='title' style='font-size: 1.25rem;' id='originalTitle"+numberOfPoints+"'>Example Modal "+numberOfPoints+"</div><button data-modal-close class='close-modal'>&times;</button></div><div class='modal-body' style='padding: 10px 15px; '><div id='originalDescription"+numberOfPoints+"'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum facilis labore nisi maiores natus laborum, repellat nihil velit et quisquam laboriosam vel itaque ab maxime. Perferendis, itaque dolor non reprehenderit, recusandae obcaecati, sapiente illum at iure atque minus labore eius adipisci aliquam ratione temporibus cupiditate libero dolorem distinctio beatae veritatis aperiam. Dolor explicabo, voluptates atque soluta dolorem alias minus nisi necessitatibus quidem inventore modi eligendi similique, aliquam eius corrupti quisquam! Eaque nam nisi expedita. Numquam autem molestias quaerat illo. Sunt?</div><img class='originalPic' id='originalPuceImage"+numberOfPoints+"' width='200px' height='200px' src='http://placehold.it/180' alt='your image' /></div></div>")
                    $("#hidden-modals").append("<div class='modal' id='ChangeModal"+numberOfPoints+"'><div class='modal-header' id='ChangeModalHeader'><div class='title' style='font-size: 1.25rem;'>Change Modal "+numberOfPoints+"</div><button data-modal-close class='close-modal'>&times;</button></div><div class='modal-body' style='padding: 10px 15px; '>Puce title: <input type='text' id='puceTitleForChange"+numberOfPoints+"'><br><br>Puce description (optional): <br><textarea name='' id='changeDescription"+numberOfPoints+"' cols='30' rows='10'></textarea><br>Puce Picture:<input type='file' id='puce3File"+numberOfPoints+"' ><img class='ChangePic' id='changePuceImage"+numberOfPoints+"' width='200px' height='200px' src='http://placehold.it/180' alt='your image' /><br><button id='savingButton"+numberOfPoints+"'>save</button></div></div>")
                    $("#points-list").append("<button data-modal-target='#ChangeModal"+numberOfPoints+"'>change modal"+numberOfPoints+"</button>")


                  }

                  console.log("after moving, collector in model number "+indexM+" is :",collector)
                  console.log("after moving, currentVer.MqBank[indexM].annotations in model number "+indexM+" is :",currentVer.MqBank[indexM].annotations)
                  //currentVer.MqBank[indexM].annotations = collector

                  showPuces(currentVer.MqBank[indexM].annotations,1)


              })
          }

        })

      }
    })

      $("#mqButton").click(()=>{
        console.log("hi")
      })


    $('#my_picture').click(function (e) {
      modalManager()
      if(Integrate && showP)

      {
          numberOfPoints++;
          //Mq-buttons
          $("#points-list").append("<button data-modal-target='#ChangeModal"+numberOfPoints+"'>change modal"+numberOfPoints+"</button>")
          //Changing modal appendage
          $("#hidden-modals").append("<div class='modal' id='ChangeModal"+numberOfPoints+"'><div class='modal-header' id='ChangeModalHeader'><div class='title' style='font-size: 1.25rem;'>Change Modal "+numberOfPoints+"</div><button data-modal-close class='close-modal'>&times;</button></div><div class='modal-body' style='padding: 10px 15px; '>Puce title: <input type='text' id='puceTitleForChange"+numberOfPoints+"'><br><br>Puce description (optional): <br><textarea name='' id='changeDescription"+numberOfPoints+"' cols='30' rows='10'></textarea><br>Puce Picture:<input type='file' id='puce3File"+numberOfPoints+"' ><img class='ChangePic' id='changePuceImage"+numberOfPoints+"' width='200px' height='200px' src='http://placehold.it/180' alt='your image' /><br><button id='savingButton"+numberOfPoints+"'>save</button></div></div>")
          document.getElementById("puce3File"+numberOfPoints).addEventListener("change",()=>{
            readURLImg(document.getElementById("puce3File"+numberOfPoints),numberOfPoints)

          })
          //Modal Appendage
          $("#hidden-modals").append("<div class='modal' id='modal"+numberOfPoints+"'><div class='modal-header' id='modalHeader'><div class='title' style='font-size: 1.25rem;' id='originalTitle"+numberOfPoints+"'>Example Modal "+numberOfPoints+"</div><button data-modal-close class='close-modal'>&times;</button></div><div class='modal-body' style='padding: 10px 15px; '><div id='originalDescription"+numberOfPoints+"'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum facilis labore nisi maiores natus laborum, repellat nihil velit et quisquam laboriosam vel itaque ab maxime. Perferendis, itaque dolor non reprehenderit, recusandae obcaecati, sapiente illum at iure atque minus labore eius adipisci aliquam ratione temporibus cupiditate libero dolorem distinctio beatae veritatis aperiam. Dolor explicabo, voluptates atque soluta dolorem alias minus nisi necessitatibus quidem inventore modi eligendi similique, aliquam eius corrupti quisquam! Eaque nam nisi expedita. Numquam autem molestias quaerat illo. Sunt?</div><img class='originalPic' id='originalPuceImage"+numberOfPoints+"' width='200px' height='200px' src='http://placehold.it/180' alt='your image' /></div></div>")
          //modal storage
          ModalCollector["hi"+numberOfPoints.toString()]="<div class='modal' id='modal"+numberOfPoints+"'><div class='modal-header' id='modalHeader'><div class='title' style='font-size: 1.25rem;' id='originalTitle"+numberOfPoints+"'>Example Modal "+numberOfPoints+"</div><button data-modal-close class='close-modal'>&times;</button></div><div class='modal-body' style='padding: 10px 15px; '><div id='originalDescription"+numberOfPoints+"'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum facilis labore nisi maiores natus laborum, repellat nihil velit et quisquam laboriosam vel itaque ab maxime. Perferendis, itaque dolor non reprehenderit, recusandae obcaecati, sapiente illum at iure atque minus labore eius adipisci aliquam ratione temporibus cupiditate libero dolorem distinctio beatae veritatis aperiam. Dolor explicabo, voluptates atque soluta dolorem alias minus nisi necessitatibus quidem inventore modi eligendi similique, aliquam eius corrupti quisquam! Eaque nam nisi expedita. Numquam autem molestias quaerat illo. Sunt?</div><img class='originalPic' id='originalPuceImage"+numberOfPoints+"' width='200px' height='200px' src='http://placehold.it/180' alt='your image' /></div></div>"
          var posX = e.offsetX ,
          posY = e.offsetY;
          //console.log("posX: "+posX)
          //console.log("posY: "+posY)
          //console.log(numberOfPoints)
          collector["hi"+numberOfPoints.toString()]=pointannotation("point: "+numberOfPoints.toString(),startingFrame,posX,posY,numberOfPoints)
          //console.log(JSON.stringify(collector))
          //console.log(JSON.stringify(ModalCollector))
          showPuces(collector,startingFrame)
          modalManager()
          const savingButton1 = document.getElementById("savingButton"+numberOfPoints+"")
          savingButton1.addEventListener("click",()=>{
              $("#originalDescription"+numberOfPoints+"").text($("#changeDescription"+numberOfPoints+"").val())
              console.log($("#originalDescription"+numberOfPoints+""))
              console.log($("#originalDescription"+numberOfPoints+"").text())
              $("#originalTitle"+numberOfPoints+"").text($("#puceTitleForChange"+numberOfPoints+"").val())

              const modal = savingButton1.closest('.modal')
              closeModal(modal)
          })
      }
    })
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.newMessage(this.VersionBankGeneral)
    console.log('Items destroyed');
    $(document).off("click")

  }
}
