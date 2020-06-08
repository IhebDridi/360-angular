import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-projects-navigation',
  templateUrl: './projects-navigation.component.html',
  styleUrls: ['./projects-navigation.component.css']
})

export class ProjectsNavigationComponent implements OnInit {

  constructor() { }

  backgroundFade= (icon,name)=>{
    this.currentImg= icon
    this.currentProjectName= name
    $(".proj-nav-flex-proj-picture-block").css({"border": " solid black 50px;"})
  }

  ngOnInit(): void {
    var notepad = document.getElementById("notepad");
    notepad.addEventListener("contextmenu",function(event){
      event.preventDefault();
      var ctxMenu = document.getElementById("ctxMenu");
      ctxMenu.style.display = "block";
      ctxMenu.style.left = (event.pageX - 10)+"px";
      ctxMenu.style.top = (event.pageY - 10)+"px";
  },false);
  notepad.addEventListener("click",function(event){
      var ctxMenu = document.getElementById("ctxMenu");
      ctxMenu.style.display = "";
      ctxMenu.style.left = "";
      ctxMenu.style.top = "";
  },false);

}

currentProjectName= "chose a project"
currentImg= "https://storage-asset.msi.com/global/picture/wallpaper/wallpaper_15855579545e81b1c23ba07.jpg"
Projects = [{
  ProjectName: "Project1",
  ProjectIcon: "http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n1-01.jpg",
  ProjectVersions: []
},
{
  ProjectName: "Project2",
  ProjectIcon: "http://www.hoopp.fr/maquette/BELZ/iframe/BELZ_PAVILLONS/BELZ_PAVILLONS/images/lv1/n1-01.jpg",
  ProjectVersions: []
},{
  ProjectName: "Project3",
  ProjectIcon: "assets/BELZ_FACADES_HTML/images/lv1/img01.jpg",
  ProjectVersions: []
},{
  ProjectName: "Project4",
  ProjectIcon: "http://www.hoopp.fr/maquette/BELZ/iframe/BELZ/BELZ/images/lv1/n4-01.jpg",
  ProjectVersions: []
}
]
}
