<?php

function array_search_for_key ( $key, $value, $array ) {
  foreach ( $array as $el ) {
    if ( $value == $el->$key ) {
      return $el;
    }
  }
  return false;
}
