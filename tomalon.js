$(document).ready(function () {
  // var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
  // or
  var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

  // var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
  // or
  //var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

  client.on('connect', function () {
    console.log('connected');
    console.log('Hello mqtt');

    var subButton = $('#subscribe-button');
    subButton.on('click', () => {
      client.subscribe($('#subscribe-topic-input').val(), function (err) {
        if (!err) {
          client.publish(pubInput.val(), payloadInput.val())
        }
      })
    })
  })

  //TOPIC AND MESSAGE IS RECEIVE
  client.on('message', function (topic, payload) {
    // message is Buffer
    var topIc = $("<td></td>").html(topic);

    var messg = $("<td></td>").text(payload);
    var tableRow = $("<tr></tr>")

    tableRow.append(topIc);
    tableRow.append(messg);

    $("#tbl-body").append(tableRow);
    console.log("Successfully Subscribed to:" + topic)
  })

  var pubButton = $('#publish-button');
  var pubInput = $('#topic-input');
  var payloadInput = $('#payload-input');

  //A function for Publishing
  pubButton.on('click', () => {
    var pubInput = $('#topic-input').val();
    var payloadInput = $('#payload-input').val();
    if (pubInput == "" && payloadInput == "") {
      alert("Please Input Publish field!")
    }
    else {
      client.publish($('#topic-input').val() + $('#payload-input').val());
      console.log("Successfully Published!");
    }
  })
})