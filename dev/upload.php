<?php

$target_dir = "./uploads/";

$file = $_FILES["file"];
if ($file) {
	$file_name = $file["name"];
	$target_file = $target_dir . basename($file_name) . ".dat";

	echo "<p>";
	if (move_uploaded_file($file["tmp_name"], $target_file)) {
		echo "Uploaded " . $file_name;
	} else {
		echo "Failed to upload " . $file_name;
	}
	echo "<p>";
}

?>

<!DOCTYPE html>
<html>
<body>
<form action="upload.php" method="post" enctype="multipart/form-data">
	<input type="file" id="file" name="file">
	<input type="submit" name="submit" value="Upload">
</form>

<?php
	$files = scandir($target_dir);
	foreach ($files as $value) {
		if ($value != "." && $value != "..") {
			echo '<br/><a href="' . $target_dir . $value . '">' . $value . "</a>";
		}
	}
?>

</body>
</html>
