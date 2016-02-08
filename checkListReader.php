<?php

/*

.o88b. db   db d88888b  .o88b. db   dD db      d888888b .d8888. d888888b      d8888b. d88888b  .d8b.  d8888b. d88888b d8888b.
d8P  Y8 88   88 88'     d8P  Y8 88 ,8P' 88        `88'   88'  YP `~~88~~'      88  `8D 88'     d8' `8b 88  `8D 88'     88  `8D
8P      88ooo88 88ooooo 8P      88,8P   88         88    `8bo.      88         88oobY' 88ooooo 88ooo88 88   88 88ooooo 88oobY'
8b      88~~~88 88~~~~~ 8b      88`8b   88         88      `Y8b.    88         88`8b   88~~~~~ 88~~~88 88   88 88~~~~~ 88`8b
Y8b  d8 88   88 88.     Y8b  d8 88 `88. 88booo.   .88.   db   8D    88         88 `88. 88.     88   88 88  .8D 88.     88 `88.
`Y88P' YP   YP Y88888P  `Y88P' YP   YD Y88888P Y888888P `8888Y'    YP         88   YD Y88888P YP   YP Y8888D' Y88888P 88   YD

Author: Chris Sigouin
Date: 01/21/2016

*/

$listTypes = array('BREAK_AND_ENTER' => 'BE', 'SUDDEN_DEATH' => 'SD', 'IMPAIRED_DRIVING' => 'ID', 'THEFT' => 'TH',
                   'FIRE' => 'FI', 'SEXUAL_ASSAULT' => 'SA', 'ASSAULT' => 'AU');

$listType = $listTypes['BREAK_AND_ENTER']; // DEFAULT

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CHECKLIST READER</title>
  </head>
  <body>

    <form action="checkListReader.php" method="POST"/>
      <?php
      foreach($listTypes as $key => $value) {
          ?>
          <label for="break_and_enter"><?php echo $key ?></label>
          <input type="radio" name="list" value="<?php echo $value ?>" />
          </br>
          <?php
      }
      ?>

      <button type="submit">LOAD LIST</button>

    </form>
    <pre>
<?php



if(isset($_POST['list'])) {
  $chosenList = $_POST['list'];
  foreach($listTypes as $key => $value ) {
      if($chosenList == $value) { $listType = $chosenList; }
  }
}

$checkList = file_get_contents('Checklists.json');
$checkListArray = json_decode($checkList, true);

//var_dump($checkListArray);

foreach( $checkListArray as $key => $value) {

  // Check for the type of list that you want ( Defined above as constants )
  if($checkListArray[$key]["id"] == $listType ) {

      // Check to see if the value is an array
      if( gettype($value) == 'array'){
          // Loop through this array
          foreach($value as $key => $value2 ) {
            if( $key == 'name') { echo "<h1 style='text-align: center'>$value2</h1>"; }
            // Look for the 'sections' property
            if( $key == 'sections' ) {
                // Check to see if the value is an array
                if( gettype($value2) == 'array' ) {
                    // Loop through the array [ === SECTION TITLES OUTPUT HERE === ]
                    foreach($value2 as $key => $value3 ) {
                      // Output 'Title' of the section and space
                      echo "\n\n".$value3['title']."\n\n";
                      if( gettype($value3) == 'array') {
                          foreach($value3 as $key => $value4) {
                            if( $key == 'questions' ) {
                              if( gettype($value4) == 'array') {
                                  // Loop through the array [ === QUESTIONS OUTPUT HERE === ]
                                  foreach($value4 as $key => $question) {
                                    $quesNumber = $key + 1;
                                    echo "$quesNumber .".$question['output']."\n";
                                    if( isset($question['additionalQuestions'])) {
                                      echo "\n\tADDITIONAL QUESTIONS\n";
                                      if( gettype($question['additionalQuestions']) == 'array') {
                                        // Loop through the additional questions [ === ADDITIONAL QUESTIONS OUTPUT HERE === ]
                                        foreach($question['additionalQuestions'] as $key => $question2) {
                                          $quesNumber = $key + 1;
                                          echo "\t$quesNumber. ".$question2['output']."\n";
                                        }
                                        echo "\n";
                                      }
                                    }



                                   }
                              }
                            }
                          }
                      }
                    }
                }
            }
          }
      }
  }
}

?>
  </pre>
  </body>
</html>
