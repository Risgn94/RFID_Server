/**
 * Created by asgerarnbjornthyregod on 23/05/2017.
 */
setInterval(function(){
    const url = "/placements/all";
    $.get(url, function (data) {
        console.log(data);
        const doctors = data[0].map(data => {
            return `
                    <tr>
                        <td>${data.doctor.name}</td>
                        <td>${data.doctor.type}</td>
                        <td>${data.roomName}</td>
                    </tr>
                `;
        }).join('');
        $('#doctor-table tbody').html(doctors);
        const patients = data[1].map(data => {
            return `
                    <tr>
                        <td>${data.patient.name}</td>
                        <td>${data.patient.disease}</td>
                        <td>${data.roomName}</td>
                    </tr>
                `;
        }).join('');
        $('#patient-table tbody').html(patients);
        const equipment = data[2].map(data => {
            return `
                    <tr>
                        <td>${data.equipment.name}</td>
                        <td>${data.equipment.type}</td>
                        <td>${data.roomName}</td>
                    </tr>
                `;
        }).join('');
        $('#equipment-table tbody').html(equipment);
    });
}, 5000);
