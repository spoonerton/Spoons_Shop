const itemListURL = "https://raw.githubusercontent.com/spoonerton/Spoons_Shop/main/StoreItems.json";
const eventListURL = "https://raw.githubusercontent.com/spoonerton/Spoons_Shop/main/StoreIncidents.json";
const shopExtURL = "https://raw.githubusercontent.com/spoonerton/Spoons_Shop/main/ShopExt.json";
const modListURL = "https://raw.githubusercontent.com/spoonerton/Spoons_Shop/main/modlist.json";
const commandListURL = "https://raw.githubusercontent.com/spoonerton/Spoons_Shop/main/commands.json";

//tooltipJS
$(document).ready(function(){
    $("body").tooltip({
        selector : '[data-toggle=tooltip]',
        animated: 'fade',
        placement: 'bottom',
        trigger: 'click'
    });
  });

//itemslist
let itemList = null;
$.getJSON(itemListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'category'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="category"></td></tr>'
    };

    var itemData = [];
    $.each(data.items, function(index, value) {
        if (value["price"] > 0) {
            itemData.push(value);
        }
    });

    if (itemData.length == 0){
        document.getElementById('items').prepend("Items are Disabled!");
        $("#items").children().hide();
    }
    itemList = new List('items', options, itemData);
});

//itemlistagain
console.log(itemList);

//eventlist
let eventList = null;
$.getJSON(eventListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'karmatype'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="karmatype"></td></tr>'
    };

    var eventData = [];
    $.each(data.incitems, function(index, value) {

        //evblacklist//
        var evBlacklist = ['trait', 'removetrait', 'pawn', 'replacetrait', 'backpack'];
        if (evBlacklist.indexOf(value["abr"]) != -1){
            return;
        } 

        if (value["price"] > 0) {
            eventData.push(value);
        }
    });

    eventList = new List('events', options, eventData);
});

let traitList = null;
let raceList = null;
$.getJSON(shopExtURL, function(data) {

//TraitList
    var items = '';
    $.each(data.traits, function(index, val){
        if (val.canAdd == true){        
            items += '<tr>';
            items += '<td class="name"><b>' + val.name + '</b></br><small>' + val.description + '</small></td>';
            items += '<td class="stats">' + val.stats + '</td>';
            items += '<td class="mod">' + val.data.mod + '</td>';
            items += '<td class="addPrice">' + val.addPrice + '</td>';
            items += '<td class="removePrice">' + val.removePrice + '</td>';
            items += '</tr>';
        }        
    })
    $('#traitstable').append(items);
 
  var options = {
     valueNames: ['name', 'addPrice', 'removePrice', 'stats','canAdd', 'mod'],
    };
    traitList = new List('traits', options);


    //RaceList
    var items = '';
    $.each(data.races, function(index, val){
        if (val.enabled == true){        
            items += '<tr>';
            items += '<td class="name"><b>' + val.name;
            items += '<button type="button" class="btn btn-secondary" data-toggle="tooltip" title="'+ val.data.stats + '"><i class="fa fa-address-card"></i></button>';
            items += '</b></br><small>' + val.description + '</small></td>';
            items += '<td class="addPrice">' + val.price + '</td>';
            items += '</tr>'

        }        
    })
    $('#racestable').append(items);

    var options = {
        valueNames: ['name', 'price'],
    };
    racesList = new List('races', options);
});

var tabs = angular.module('tabs', [])
    .controller('tabCtrl', function($scope) {
        $scope.selected = "1";
    });

    function searchBar() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
//Command List
$.getJSON(commandListURL, function(data) {

        var items = '';
        $.each(data, function(index, val){
            if (val.userLevel != 'Moderator'){ 
                if (val.description != null){      
                    items += '<li class="list-group-item"><b>' + val.usage + '</b> - ' + val.description;
                } else {
                    items += '<li class="list-group-item"><b>' + val.usage + '</b>';  
                }
            }        
        })
        $('#list1 > ul').html(items);
    })

//Mod List

$.getJSON(modListURL, function(data) {

        var items = '';
        $.each(data, function(index, val){ 
            if (val.steamId == null){ 
                items += '<li class="list-group-item col-md-3"><b>' + val.name + '</b><i></br> by ' + val.author + '</i>';       
            } 
            else {
                items += '<li class="list-group-item col-md-3"><a href=https://steamcommunity.com/sharedfiles/filedetails/?id=' + val.steamId + '><b>' + val.name + '</b></a></br><i> by ' + val.author + '</i>';       
            }     
        })
        $('#list2 > ul').html(items);
    })



