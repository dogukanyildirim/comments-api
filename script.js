const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "write_your_access_token"
const comment_url = "https://kokpit.smartlimon.com/items/comment"

const comment_id_input = document.getElementById("comment-id-input")
const comment_text_input = document.getElementById("comment-text-input")
const comment_name_text_input = document.getElementById(
  "comment-name-text-input"
)
const post_button = document.getElementById("post-button")
const delete_button = document.getElementById("delete-button")
const update_button = document.getElementById("update-button")
const list_container = document.getElementById("list-container")

//let comment_list = []

const callApi = (apiEndpoint = "comment", method = "GET", payload = null) => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl + apiEndpoint, {
      method: method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: payload ? JSON.stringify(payload) : payload,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getComments = () => {
  list_container.innerHTML = ""
  callApi("comment").then((resp) => {
    resp
      .forEach((item) => {
        let li = document.createElement("li")
        let li_id_span = document.createElement("span")
        li_id_span.classList.add("id-span")
        let li_comment_span = document.createElement("span")
        li_id_span.innerText = item.id
        li_comment_span.innerText = item.comment
        li.append(li_id_span)
        li.appendChild(li_comment_span)
        list_container.append(li)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

const addComment = () => {
  if (comment_name_text_input.value === "" || comment_text_input.value === "") {
    alert("please add your name or comment!")
  } else {
    const comment_name_text = comment_name_text_input.value
    const comment_text = comment_text_input.value
    callApi("comment", "POST", {
      name: comment_name_text,
      comment: comment_text,
    })
  }
}

const updateComment = () => {
  if (comment_id_input.value === "") {
    alert("Enter the comment id to be updated!")
  } else {
    const comment_id = comment_id_input.value
    const comment_text = comment_text_input.value
    callApi("comment/" + comment_id, "PATCH", {
      comment: comment_text,
    })
  }
}

const deleteComment = () => {
  if (comment_id_input.value === "") {
    alert("Enter the comment id to be deleted!")
  } else {
    const comment_id = comment_id_input.value
    callApi("comment/" + comment_id, "DELETE")
  }
}

getComments()

post_button.addEventListener("click", addComment)
update_button.addEventListener("click", updateComment)
delete_button.addEventListener("click", deleteComment)
