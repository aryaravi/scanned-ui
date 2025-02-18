import React, { Component } from "react";

class ListDownloadable extends Component{
    render(){
        return(
		
           <div className="container">
			hey download
		   {/*<div class="card">
		<div class="card-body">
			<h5 class="card-title">Downloadable File</h5>
			<form id="downloadFileForm" action="@{/download}"
				object="${DownloadFileSearchForm}" method="POST" novalidate>

				<div class="form-group">
					<div class="row">
						<div class="col-5">
							<label for="fileName">Search File Name: </label> 
							<input
								type="text" class="form-control" id="fileName"
								field="*{fileName}" aria-describedby="fileNameHelp"
								placeholder=""> <small id="fileNameHelp"
								class="form-text text-muted">Search file by name</small></input>
						</div>
						
					</div>
					<div class="row" style="padding-top: 20px">
						<label for="setPageSize">Size</label> <select
							name="resultPageSize" id="setPageSize">
							<option value="5">5</option>
							<option value="20" selected>20</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>


				<button type="submit" class="">Search</button>
				<button type="submit" class="" formaction="clear-search">Clear</button>
			</form>
			
		</div>
	</div>
	<span>Found <span utext="${recordSize}"></span> records
	</span>*/}

	{/*<table id="announcements" class="table">
		<thead class="thead-dark">
			<tr>
				<th scope="col"></th>
				<th scope="col">File Name</th>
				<th scope="col">File Size</th>
				<th scope="col">File Id</th>
				<th scope="col">File From</th>
				<th scope="col">User Id</th>
				<th scope="col">Upload Date <a href="@{/sortFileASC/}">
						
				</a> <a href="@{/sortFileDESC/}"> </a>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr th:each="file : ${fileList.content}">
				<!-- th scope="row"> <input type="checkbox" name="selectFile" th:checked="${file.fileSelected}" /></th-->
				<th scope="row"><a
					th:href="@{/deleteFile/{id}(id = ${file.fileDestId})}"
					th:data-confirm-delete="|Are you sure you want to delete this file ${file.fileName}?|"
					onclick="if (!confirm(this.getAttribute('data-confirm-delete'))) return false">
						<img th:src="@{/img/del.jpg}" alt="Delete File" class="mr-2"
						width="25" height="25">
				</a>
				<th scope="row"><a
					th:href="@{/downloadFile/{id}(id = ${file.fileId})}"> <span
						th:text="${file.fileName}"></span>
				</a></th>
				<th scope="row" th:text="${file.fileSize}"></th>
				<th scope="row" th:text="${file.fileId}"></th>
				<th scope="row" th:text="${file.fileFrom}"></th>
				<th scope="row" th:text="${file.userName}"></th>
				<th scope="row" th:text="${file.uploadDateStr}"></th>
			</tr>

		</tbody>
		</table>*/}
	<div className="row"></div>

	{/*<nav class="w-100 p-3" aria-label="Page Navigation"
		th:if="${fileList.totalPages > 1}">
		<ul class="list-group list-group-horizontal">
			
			<li class="list-group-item" th:if="${fileList.hasPrevious()}">
				<a href="@{/download(page=${fileList.number-1})}">Previous</a>
			</li>
			<li class="list-group-item"
				th:each="i : ${#numbers.sequence(0, fileList.totalPages-1)}"
				th:classappend="${fileList.number == i? 'active' : ''}"><a
				th:if="${fileList.number != i}" th:href="@{/download(page=${i})}">[[${i+1}]]</a>
				<span th:if="${fileList.number == i}">[[${i+1}]]</span></li>
			<li class="list-group-item" th:if="${fileList.hasNext()}"><a
				th:href="@{/download(page=${fileList.number+1})}">Next</a></li>
		</ul>
	</nav>*/}
	
	</div>




        )
    }
}

export default ListDownloadable