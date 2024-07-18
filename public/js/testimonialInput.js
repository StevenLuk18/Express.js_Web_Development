// File: testmonialInput.js
// Called by routes/mytestmonial_mb.ejs

// Add this function before creating the Handsontable instance
function dateFormatter(value, format) {
    if (!value) return '';
    const date = moment(value, 'YYYY-MM-DD', true);
    return date.isValid() ? date.format(format) : value;
}
fetch('/testimonialInput/getOwnTestimonial')
    .then(response => response.json())
    .then(data => {
        // Register the custom cell type
        Handsontable.cellTypes.registerCellType('actions', {
            renderer: (instance, td, row, col, prop, value, cellProperties) => {
                Handsontable.renderers.cellDecorator(instance, td, row, col, prop, value, cellProperties);

                td.innerHTML = `
                    <div class="action-buttons">
                        <button class="delete-btn">Delete</button>
                        <button class="update-btn">Update</button>
                    </div>
                `;

                const deleteBtn = td.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => {
                    const rowData = instance.getDataAtRow(row);
                    const testimonialId = rowData[1];

                    fetch('/testimonialInput/deleteOwnTestimonial', { 
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            testimonialId: testimonialId
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            instance.alter('remove_row', row);
                            alert('Selected testimonial deleted successfully');
                        }
                        else {
                            alert('Failed to delete selected testimonial : ' + result.message);
                            console.log('Failed to delete selected testimonial : ', result.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error: ', error);
                        alert('Error: ' + error);
                    });
                });

                const updateBtn = td.querySelector('.update-btn');
                updateBtn.addEventListener('click', () => {
                    const rowData = instance.getDataAtRow(row);
                    const testimonialId = rowData[1];
                    const newTravelDate = rowData[2];
                    const updatedTestimonial = rowData[3]; 

                    fetch('/testimonialInput/updateOwnTestimonial', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            testimonialId: testimonialId,
                            newTravelDate: newTravelDate,
                            updatedTestimonial: updatedTestimonial
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            alert('Testimonial updated');
                        }
                        else {
                            alert('Fail to updte testimonial: ' + result.message);
                            console.error('Failed to update testimonial: ', result.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error: ', error);
                        alert('Error: ' + error);
                    });
                });
            }
        });

        // Format the tmdate column
        data.forEach(item => {
            const date = new Date(item.tmdate);
            item.tmdate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        });

        // Create the Handsontable instance
        const container = document.getElementById('TestimonialHandsonTable');
        const hot = new Handsontable(container, {
            width: 700,
            data: data,
            rowHeaders: true,
            colHeaders: [ 'Actions', 'ID', 'Travel Date (yyyy-MM-dd)', 'Testimonial' ],
            hiddenColumns: { columns: [1] },  // hide the ID column
            columns: [
                { type: 'actions', readonly: true },
                { data: '_id' },
                { 
                    data: 'tmdate', 
                    type: 'date', 
                    dateFormat: 'YYYY-MM-DD',
                    correctFormat: true,
                    datePickerConfig: {
                        firstDay: 1,
                        numberOfMonths: 1,
                        disableDayFn: false,
                        format: 'YYYY-MM-DD'
                    },
                    renderer: function(instance, td, row, col, prop, value, cellProperties) {
                        td.innerHTML = dateFormatter(value, 'YYYY-MM-DD');
                        return td;
                    }
                },
                { data: 'tmtest', width: 400, type: 'text', editor: 'text' }
            ],
            licenseKey: 'non-commercial-and-evaluation',
            stretchH: 'all', // Add this to make columns stretch to fit the container width
            autoRowSize: true, // Add this to automatically adjust row heights
            autoColumnSize: true // Add this to automatically adjust column widths
        });
    })
    .catch(error => console.log('Error fetching testimonials:', error)
);
function insertTestimonial() { 
    fetch('/testimonialInput/insertOwnTestimonial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            travelDate: document.getElementById("datepicker").value,
            testimonial: document.getElementById("testimonial").value
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Testimonial inserted');                    
        }
        else {
            alert('Fail to insert testimonial: ' + result.message)
            console.log('Fail to insert testimonial: ', result.message);
        }
    })
    .catch(error => {
        console.error('Error: ', error);
        alert('Error: ' + error);
    });
}
