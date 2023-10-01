const { log } = require("console")
const  http = require("https")



const postData = JSON.stringify({
    "email": "dummy@gmail.com",
    "fields": {
      "name": "Dummy",
      "last_name": "Testerson"
    },
    "groups": []
  });

const options = {
    method : "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzg4OWYzMjBkOGM2ZTM3OTk5Zjk3NTM1ODUzYWNkYWEwZjkwY2I3MWZkODIwMTM5OWJlNDUyMzFhMDVkYzQzZmE4MjRhNDY2MjE2MGQ1ZTQiLCJpYXQiOjE2OTU5ODQ4MDEuODcwMzM0LCJuYmYiOjE2OTU5ODQ4MDEuODcwMzM3LCJleHAiOjQ4NTE2NTg0MDEuODU0NzIxLCJzdWIiOiI2NDY2NDQiLCJzY29wZXMiOltdfQ.FszgBkdon25AW8fmfz_Ub18x8HNYw8ALxmXp46b4aELffRpqhWc6SqpZizHK2KYx5Ktm_au3-RcGQlqS7IqTdHbW4vC1KRpri_NPX0hYui_Vo4mwByGD3AFH_diZswJzkPOEMNOc3vM4W_e_R25bL_HRrulqTA3eCNd-Q15Bs_89t5T2ZznymYNUybgTyxUdcE_nrmLgyfReL_f7l3-eMoliQ1uLQBRYSdpPp8P6sBt3BgKxjzL81dsAoCduJhUmHYgn0wrinnKvHZUIfFW7TGIw1IPC_JuZYC1i_sCrrwETsf82JUb5PWpIt4Yu13uVDbTbxwm48uBWO6cqFx4W-iRPoOcSEFh1HerUKzzYZb2_r1AOg5CI2-GvYsg9ggudn1k7dtm17zPSrAdTgIQ9X_vAlgYcchY5Bsj94H59Wb8G0cTYR6DShb5w1NKYmuPl3Z2l1U59R--8qt9wxT1d7Sy9Fc6tvfqVk12nvzubehgEewZNvsClG5sEdW-qmfPGGaWEtVP6moJwhlisth8e1CBNZlo9brtS6RWsbjKFl1cYMGWvi3QpZ5SYC2nmCVOF1v9QuvPL5GHXvKG4RpBZfxbG_Az0wFi8__X_usBYCIITH1EVsc2YyTtzEEBWz4sKvXBW56CKqndLSW5V14hl5cawZv-znN2Wac12SF1v2K0',

      },
}

const url = "https://connect.mailerlite.com/api/subscribers"


const  mailRequest = http.request(url,options,function(res){
    console.log(res.statusCode)

    res.on("data",function(data){
        const resData = JSON.parse(data)
       
        console.log(resData);
    })
})


  
// Write data to request body
mailRequest.write(postData);
mailRequest.end();


